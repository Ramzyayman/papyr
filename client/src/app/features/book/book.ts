import {
  Component,
  ChangeDetectorRef
} from '@angular/core';
import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BookDetails } from '../../shared/models/book-details';
import { Review } from '../../shared/models/review';

import { BookService } from '../../services/book.service';
import { ReviewService } from '../../services/review.service';
import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-book',
  imports: [RouterLink, FormsModule],
  templateUrl: './book.html',
  styleUrl: './book.css'
})
export class Book {

  bookId = '';

  book!: BookDetails;

  reviews: Review[] = [];

  selectedRating = 0;

  reviewText = '';

  isInLibrary = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private reviewService: ReviewService,
    private libraryService: LibraryService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    const id =
      this.route.snapshot.paramMap.get('id');

    this.bookId = id ?? '';

    if (this.bookId) {
      this.loadBook();
    }
  }

  private loadBook(): void {
    this.bookService
      .getBookById(this.bookId)
      .subscribe({
        next: (foundBook) => {
          if (!foundBook) {
            return;
          }

          this.book = foundBook;

          this.isInLibrary =
            this.libraryService
              .getLibraryBookIds()
              .includes(this.bookId);

          this.reviews =
            this.reviewService.getReviewsByBook(
              this.bookId
            );

          this.changeDetectorRef.detectChanges();
        },

        error: (error) => {
          console.error(
            'Failed to load book:',
            error
          );
        }
      });
  }

  selectRating(rating: number): void {
    this.selectedRating = rating;
  }

  addReview(): void {
    if (
      this.selectedRating === 0 ||
      !this.reviewText.trim()
    ) {
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      username: 'You',
      date: 'Today',
      rating: this.selectedRating,
      text: this.reviewText.trim()
    };

    this.reviewService.addReview(
      this.bookId,
      newReview
    );

    this.reviews =
      this.reviewService.getReviewsByBook(
        this.bookId
      );

    this.reviewText = '';
    this.selectedRating = 0;
  }

  toggleLibrary(): void {
    if (this.isInLibrary) {
      this.libraryService.removeBook(
        this.bookId
      );

      this.isInLibrary = false;
    } else {
      this.libraryService.addBook(
        this.bookId
      );

      this.isInLibrary = true;
    }
  }
}