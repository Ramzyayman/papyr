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


  // Temporary until authentication exists
  isLoggedIn = false;



  private libraryBookIds: number[] = [
    1,
    3
  ];



  get books(): Book[] {

    return BOOKS.filter(book =>
      this.libraryBookIds.includes(book.id)
    );

  }


}