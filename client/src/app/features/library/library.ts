import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { Book } from '../../shared/models/book';

import { BookService } from '../../services/book.service';
import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-library',
  imports: [RouterLink],
  templateUrl: './library.html',
  styleUrl: './library.css'
})
export class Library implements OnInit {

  isLoggedIn = true;

  books: Book[] = [];

  constructor(
    private bookService: BookService,
    private libraryService: LibraryService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  get libraryBookIds(): string[] {
    return this.libraryService.getLibraryBookIds();
  }

  private loadBooks(): void {

    const savedIds =
      this.libraryService.getLibraryBookIds();

    if (savedIds.length === 0) {
      this.books = [];
      return;
    }

    this.bookService
      .getBooksByIds(savedIds)
      .subscribe({
        next: books => {

          this.books = books;

          this.changeDetectorRef.detectChanges();
        },

        error: error => {

          console.error(
            'Failed to load library books:',
            error
          );

          this.books = [];

          this.changeDetectorRef.detectChanges();
        }
      });
  }
}