import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BOOKS } from '../../shared/data/books';
import { Book } from '../../shared/models/book';

import { LibraryService } from '../../services/library.service';


@Component({
  selector: 'app-library',
  imports: [RouterLink],
  templateUrl: './library.html',
  styleUrl: './library.css'
})
export class Library {


  // Temporary authentication state
  // Later this will come from AuthService

  isLoggedIn = true;



  constructor(
    private libraryService: LibraryService
  ) {}



  /*
   * IDs of books in user's library.
   *
   * Later:
   * GET /api/library
   */

  get libraryBookIds(): number[] {

    return this.libraryService.getLibraryBookIds();

  }




  /*
   * Books displayed in library.
   *
   * Uses the same BOOKS data as Catalog.
   */

  get books(): Book[] {

    return BOOKS.filter(book =>
      this.libraryBookIds.includes(book.id)
    );

  }


}