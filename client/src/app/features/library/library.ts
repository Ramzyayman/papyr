import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BOOKS, Book } from '../../shared/data/books';

@Component({
  selector: 'app-library',
  imports: [RouterLink],
  templateUrl: './library.html',
  styleUrl: './library.css'
})
export class Library {

  /*
   * Temporary mock library.
   *
   * These IDs represent the books the user
   * has added to their library.
   *
   * Later this will come from:
   *
   * GET /api/library
   */
  private libraryBookIds: number[] = [
    1,
    3
  ];


  /*
   * Books displayed in the library.
   *
   * These are pulled from the same BOOKS data
   * used by the Catalog.
   */
  get books(): Book[] {

    return BOOKS.filter(book =>
      this.libraryBookIds.includes(book.id)
    );
  }

}