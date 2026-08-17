import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BookDetails } from '../../shared/models/book-details';
import { Review } from '../../shared/models/review';

import { BookService } from '../../services/book.service';
import { ReviewService } from '../../services/review.service';


@Component({
  selector: 'app-book',
  imports: [RouterLink, FormsModule],
  templateUrl: './book.html',
  styleUrl: './book.css'
})
export class Book {


  bookId = 1;


  book!: BookDetails;


  reviews: Review[] = [];


  selectedRating = 0;


  reviewText = '';


  isInLibrary = false;



  constructor(

    private route: ActivatedRoute,

    private bookService: BookService,

    private reviewService: ReviewService

  ) {


    const id =
      Number(this.route.snapshot.paramMap.get('id'));


    this.bookId = id || 1;


    this.loadBook();

  }





  // ========================================
  // Load book
  // ========================================

  private loadBook(): void {


    const foundBook =
      this.bookService.getBookById(this.bookId);



    if (!foundBook) {

      return;

    }



    this.book = foundBook;



    this.reviews =
      this.reviewService.getReviewsByBook(this.bookId);

  }





  // ========================================
  // Rating
  // ========================================

  selectRating(rating: number): void {

    this.selectedRating = rating;

  }





  // ========================================
  // Add review
  // ========================================

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
      this.reviewService.getReviewsByBook(this.bookId);



    this.reviewText = '';

    this.selectedRating = 0;


  }





  // ========================================
  // Library
  // ========================================

  toggleLibrary(): void {


    this.isInLibrary =

      !this.isInLibrary;


  }


}