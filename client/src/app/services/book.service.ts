import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import {
  catchError,
  map,
  shareReplay,
  switchMap
} from 'rxjs/operators';

import { Book } from '../shared/models/book';
import { BookDetails } from '../shared/models/book-details';

interface OpenLibraryDoc {
  key?: string;
  title?: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  subject?: string[];
}

interface OpenLibrarySearchResponse {
  docs?: OpenLibraryDoc[];
}

interface OpenLibraryAuthor {
  author?: {
    key?: string;
  };
}

interface OpenLibraryWork {
  key?: string;
  title?: string;
  covers?: number[];
  description?: string | { value?: string };
  subjects?: string[];
  authors?: OpenLibraryAuthor[];
  first_publish_date?: string;
}

interface OpenLibraryAuthorResponse {
  name?: string;
}

interface OpenLibraryEdition {
  publishers?: string[];
  publish_date?: string;
  number_of_pages?: number;
  isbn?: string[];
  isbn_10?: string[];
  isbn_13?: string[];
}

interface OpenLibraryEditionResponse {
  entries?: OpenLibraryEdition[];
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly searchUrl =
    'https://openlibrary.org/search.json';

  private readonly coversUrl =
    'https://covers.openlibrary.org/b/id';

  private booksCache$: Observable<Book[]> | null = null;

  constructor(
    private http: HttpClient
  ) {}

  searchBooks(
    query: string,
    limit = 40
  ): Observable<Book[]> {

    const params = new HttpParams()
      .set('q', query)
      .set('limit', limit)
      .set(
        'fields',
        'key,title,author_name,first_publish_year,cover_i,subject'
      );

    return this.http
      .get<OpenLibrarySearchResponse>(
        this.searchUrl,
        { params }
      )
      .pipe(
        map(response =>
          (response.docs ?? [])
            .map(doc => this.mapToBook(doc))
            .filter(
              (book): book is Book =>
                book !== undefined
            )
        ),
        catchError(error => {
          console.error(
            'Failed to load books from Open Library:',
            error
          );

          return of([]);
        })
      );
  }

  getBooks(): Observable<Book[]> {

    if (!this.booksCache$) {
      this.booksCache$ = this.searchBooks(
        'fiction',
        40
      ).pipe(
        shareReplay(1)
      );
    }

    return this.booksCache$;
  }

  getBookById(
    id: string
  ): Observable<BookDetails | undefined> {

    const workId = id
      .replace('/works/', '')
      .replace(/^\/+/, '');

    return this.http
      .get<OpenLibraryWork>(
        `https://openlibrary.org/works/${workId}.json`
      )
      .pipe(
        switchMap(work => {

          const authorKey =
            work.authors?.[0]?.author?.key;

          const authorRequest =
            authorKey
              ? this.http.get<OpenLibraryAuthorResponse>(
                  `https://openlibrary.org${authorKey}.json`
                )
              : of({
                  name: 'Unknown author'
                });

          return authorRequest.pipe(
            switchMap(author => {

              return this.getEditionDetails(workId).pipe(
                map(edition =>
                  this.mapToBookDetails(
                    id,
                    work,
                    author.name ?? 'Unknown author',
                    edition
                  )
                )
              );
            })
          );
        }),
        catchError(error => {
          console.error(
            'Failed to load book details:',
            error
          );

          return of(undefined);
        })
      );
  }

  getBooksByIds(
    ids: string[]
  ): Observable<Book[]> {

    if (ids.length === 0) {
      return of([]);
    }

    return forkJoin(
      ids.map(id =>
        this.getBookById(id)
      )
    ).pipe(
      map(books =>
        books
          .filter(
            (book): book is BookDetails =>
              book !== undefined
          )
          .map(book => ({
            id: book.id,
            title: book.title,
            author: book.author,
            cover: book.cover,
            genre:
              book.genre[0] ??
              'Uncategorized',
            era: this.getEra(
              book.publishedYear
            ),
            rating: book.rating
          }))
      )
    );
  }

  private getEditionDetails(
    workId: string
  ): Observable<OpenLibraryEdition> {

    return this.http
      .get<OpenLibraryEditionResponse>(
        `https://openlibrary.org/works/${workId}/editions.json?limit=20`
      )
      .pipe(
        map(response => {

          const editions =
            response.entries ?? [];

          const edition =
            editions.find(item =>
              Boolean(
                item.number_of_pages ||
                item.publishers?.length ||
                item.isbn_13?.length ||
                item.isbn_10?.length ||
                item.isbn?.length
              )
            );

          return edition ?? {};
        }),
        catchError(error => {

          console.error(
            'Failed to load edition details:',
            error
          );

          return of({});
        })
      );
  }

  private mapToBook(
    doc: OpenLibraryDoc
  ): Book | undefined {

    if (!doc.key || !doc.title) {
      return undefined;
    }

    const publishedYear =
      doc.first_publish_year ?? 0;

    return {
      id: this.getWorkId(doc.key),

      title: doc.title,

      author:
        doc.author_name
          ?.slice(0, 3)
          .join(', ') ??
        'Unknown author',

      cover:
        doc.cover_i
          ? `${this.coversUrl}/${doc.cover_i}-L.jpg`
          : 'https://placehold.co/300x450?text=No+Cover',

      genre:
        this.getGenre(doc.subject),

      era:
        this.getEra(publishedYear),

      rating: 0
    };
  }

  private mapToBookDetails(
    id: string,
    work: OpenLibraryWork,
    author: string,
    edition: OpenLibraryEdition
  ): BookDetails {

    const description =
      typeof work.description === 'string'
        ? work.description
        : work.description?.value;

    const genres =
      (work.subjects ?? [])
        .filter(
          (subject): subject is string =>
            typeof subject === 'string'
        )
        .slice(0, 5);

    const coverId =
      work.covers?.[0];

    const publishedYear =
      this.getPublishedYear(
        edition.publish_date ??
        work.first_publish_date
      );

    const isbn =
      edition.isbn_13?.[0] ??
      edition.isbn_10?.[0] ??
      edition.isbn?.[0] ??
      'Not available';

    return {
      id,

      title:
        work.title ??
        'Unknown title',

      author,

      description:
        description ??
        'No description available.',

      cover:
        coverId
          ? `${this.coversUrl}/${coverId}-L.jpg`
          : 'https://placehold.co/300x450?text=No+Cover',

      genre:
        genres.length > 0
          ? genres
          : ['Uncategorized'],

      rating: 0,

      publisher:
        edition.publishers?.[0] ??
        'Unknown publisher',

      publishedYear,

      pages:
        edition.number_of_pages ??
        0,

      isbn
    };
  }

  private getPublishedYear(
    date?: string
  ): number {

    if (!date) {
      return 0;
    }

    const match =
      date.match(/\d{4}/);

    return match
      ? Number(match[0])
      : 0;
  }

  private getGenre(
    subjects?: string[]
  ): string {

    if (!subjects || subjects.length === 0) {
      return 'Literary Fiction';
    }

    const subjectText =
      subjects.join(' ').toLowerCase();

    if (
      subjectText.includes('poetry') ||
      subjectText.includes('poems')
    ) {
      return 'Poetry Collections';
    }

    if (
      subjectText.includes('history') ||
      subjectText.includes('historical')
    ) {
      return 'Historical & Period';
    }

    if (
      subjectText.includes('philosophy') ||
      subjectText.includes('essays')
    ) {
      return 'Philosophy & Essays';
    }

    return 'Literary Fiction';
  }

  private getWorkId(
    key: string
  ): string {

    return key
      .replace('/works/', '')
      .replace(/^\/+/, '');
  }

  private getEra(
    publishedYear: number
  ): string {

    if (!publishedYear) {
      return 'Unknown';
    }

    if (publishedYear < 1800) {
      return 'Classic Antiquity';
    }

    if (publishedYear <= 1945) {
      return 'Modernist (1890–1945)';
    }

    return 'Contemporary';
  }
}