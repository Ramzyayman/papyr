import { Book } from '../models/book';


export const BOOKS: Book[] = [

  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    cover: 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
    genre: 'Literary Fiction',
    era: 'Modernist (1890–1945)',
    rating: 4.4
  },

  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    cover: 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
    genre: 'Literary Fiction',
    era: 'Modernist (1890–1945)',
    rating: 4.5
  },

  {
    id: 3,
    title: 'The Hobbit',
    author: 'J. R. R. Tolkien',
    cover: 'https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg',
    genre: 'Literary Fiction',
    era: 'Contemporary',
    rating: 4.7
  }

];