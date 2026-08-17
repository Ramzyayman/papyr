import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LibraryService {


  private libraryBookIds: number[] = [
    1,
    2,
    3
  ];



  getLibraryBookIds(): number[] {

    return this.libraryBookIds;

  }



  addBook(bookId: number): void {

    if (!this.libraryBookIds.includes(bookId)) {

      this.libraryBookIds.push(bookId);

    }

  }



  removeBook(bookId: number): void {

    this.libraryBookIds =
      this.libraryBookIds.filter(
        id => id !== bookId
      );

  }


}