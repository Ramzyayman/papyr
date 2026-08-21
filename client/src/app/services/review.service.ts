import { Injectable } from '@angular/core';

import { REVIEWS_BY_BOOK } from '../shared/data/reviews';
import { Review } from '../shared/models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private readonly storageKey = 'papyr_reviews';

  getReviewsByBook(bookId: string): Review[] {
    const storedReviews =
      this.getStoredReviews();

    return storedReviews[bookId] ?? [];
  }

  addReview(
    bookId: string,
    review: Review
  ): void {
    const storedReviews =
      this.getStoredReviews();

    if (!storedReviews[bookId]) {
      storedReviews[bookId] = [];
    }

    storedReviews[bookId].unshift(review);

    this.saveReviews(storedReviews);
  }

  getMockReviews(bookId: number): Review[] {
    return REVIEWS_BY_BOOK[bookId] ?? [];
  }

  private getStoredReviews(): Record<string, Review[]> {
    const stored =
      localStorage.getItem(this.storageKey);

    if (!stored) {
      return {};
    }

    try {
      return JSON.parse(stored) as Record<
        string,
        Review[]
      >;
    } catch {
      return {};
    }
  }

  private saveReviews(
    reviews: Record<string, Review[]>
  ): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(reviews)
    );
  }
}