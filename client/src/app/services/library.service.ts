import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private readonly storageKey = 'papyr_library';


  getLibraryBookIds(): string[] {
    const storedIds =
      localStorage.getItem(this.storageKey);

    if (!storedIds) {
      return [];
    }

    try {
      return JSON.parse(storedIds) as string[];
    } catch {
      return [];
    }
  }


  addBook(bookId: string): void {
    const libraryBookIds =
      this.getLibraryBookIds();

    if (!libraryBookIds.includes(bookId)) {
      libraryBookIds.push(bookId);

      this.saveLibrary(
        libraryBookIds
      );
    }
  }


  removeBook(bookId: string): void {
    const libraryBookIds =
      this.getLibraryBookIds()
        .filter(id => id !== bookId);

    this.saveLibrary(
      libraryBookIds
    );
  }


  private saveLibrary(
    libraryBookIds: string[]
  ): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(libraryBookIds)
    );
  }

}