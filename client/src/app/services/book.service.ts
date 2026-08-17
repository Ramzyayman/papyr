import { Injectable } from '@angular/core';

import { BOOKS } from '../shared/data/books';
import { BOOK_DETAILS } from '../shared/data/book-details';

import { Book } from '../shared/models/book';
import { BookDetails } from '../shared/models/book-details';


@Injectable({
  providedIn: 'root'
})
export class BookService {


  getBooks(): Book[] {

    return BOOKS;

  }



  getBookById(id: number): BookDetails | undefined {

    return BOOK_DETAILS.find(
      book => book.id === id
    );

  }


}