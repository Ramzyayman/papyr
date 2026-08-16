import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface BookData {
  id: number;
  title: string;
  author: string;
  description: string;
  cover: string;
  genre: string[];
  rating: number;
  publisher: string;
  publishedYear: number;
  pages: number;
  isbn: string;
}

interface Review {
  id: number;
  username: string;
  date: string;
  rating: number;
  text: string;
}

@Component({
  selector: 'app-book',
  imports: [RouterLink, FormsModule],
  templateUrl: './book.html',
  styleUrl: './book.css'
})
export class Book {

  bookId = 1;

  book!: BookData;

  reviews: Review[] = [];

  selectedRating = 0;

  reviewText = '';

  isInLibrary = false;


  // ========================================
  // Mock books
  // ========================================

  private books: BookData[] = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description:
        'The Great Gatsby, F. Scott Fitzgerald’s third book, stands as the supreme achievement of his career. The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan is an exquisitely crafted tale of America in the 1920s.',
      cover:
        'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
      genre: [
        'Literary Fiction',
        'Classic'
      ],
      rating: 4.4,
      publisher: 'Scribner',
      publishedYear: 1925,
      pages: 180,
      isbn: '978-0-7432-7356-5'
    },

    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      description:
        'A dystopian novel set in a world of perpetual war, pervasive government surveillance, and public manipulation. Winston Smith struggles against a society in which independent thought itself has become dangerous.',
      cover:
        'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
      genre: [
        'Literary Fiction',
        'Dystopian'
      ],
      rating: 4.5,
      publisher: 'Signet Classic',
      publishedYear: 1949,
      pages: 328,
      isbn: '978-0-451-52493-5'
    },

    {
      id: 3,
      title: 'The Hobbit',
      author: 'J. R. R. Tolkien',
      description:
        'Bilbo Baggins is a quiet hobbit who enjoys a comfortable life until the wizard Gandalf and a company of dwarves arrive at his door. Soon Bilbo finds himself on an unexpected adventure across Middle-earth.',
      cover:
        'https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg',
      genre: [
        'Fantasy',
        'Adventure'
      ],
      rating: 4.7,
      publisher: 'Mariner Books',
      publishedYear: 1937,
      pages: 310,
      isbn: '978-0-547-92822-7'
    }
  ];


  // ========================================
  // Mock reviews
  // ========================================

  private reviewsByBook: Record<number, Review[]> = {

    1: [
      {
        id: 1,
        username: 'Ramzy',
        date: '2 Aug 2023',
        rating: 5,
        text:
          'A gripping and beautifully written story that kept me hooked from the very first page.'
      },
      {
        id: 2,
        username: 'Natalie',
        date: '14 Sep 2023',
        rating: 4,
        text:
          'A timeless story with incredible characters and a fascinating atmosphere.'
      },
      {
        id: 3,
        username: 'Amr',
        date: '21 Oct 2023',
        rating: 4,
        text:
          'Beautifully written and surprisingly engaging. Definitely worth reading.'
      }
    ],

    2: [
      {
        id: 4,
        username: 'Kyrollos',
        date: '5 Jul 2023',
        rating: 5,
        text:
          'One of the most unsettling books I have ever read. Still feels relevant today.'
      },
      {
        id: 5,
        username: 'Maya',
        date: '18 Aug 2023',
        rating: 4,
        text:
          'A fascinating dystopian world with an unforgettable atmosphere.'
      }
    ],

    3: [
      {
        id: 6,
        username: 'James',
        date: '11 Jun 2023',
        rating: 5,
        text:
          'An incredibly fun adventure. Tolkien creates such a memorable world.'
      },
      {
        id: 7,
        username: 'Emma',
        date: '3 Nov 2023',
        rating: 5,
        text:
          'A wonderful fantasy classic that is just as enjoyable as an adult.'
      }
    ]

  };


  constructor(
    private route: ActivatedRoute
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
      this.books.find(
        book => book.id === this.bookId
      );

    if (!foundBook) {
      this.book =
        this.books[0];

      this.bookId =
        this.books[0].id;
    } else {
      this.book = foundBook;
    }


    this.reviews = [
      ...(this.reviewsByBook[this.bookId] ?? [])
    ];
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


    this.reviews.unshift(newReview);


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