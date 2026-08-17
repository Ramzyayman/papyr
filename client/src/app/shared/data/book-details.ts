import { BookDetails } from '../models/book-details';


export const BOOK_DETAILS: BookDetails[] = [

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
      'A dystopian novel set in a world of perpetual war, pervasive government surveillance, and public manipulation.',
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
      'Bilbo Baggins is a quiet hobbit who enjoys a comfortable life until an unexpected adventure begins.',
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