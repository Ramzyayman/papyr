import { Injectable } from '@angular/core';

import { REVIEWS_BY_BOOK } from '../shared/data/reviews';
import { Review } from '../shared/models/review';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {


  getReviewsByBook(bookId: number): Review[] {

    return REVIEWS_BY_BOOK[bookId] ?? [];

  }



  addReview(
    bookId: number,
    review: Review
  ): void {


    if (!REVIEWS_BY_BOOK[bookId]) {

      REVIEWS_BY_BOOK[bookId] = [];

    }


    REVIEWS_BY_BOOK[bookId].unshift(review);

  }


}