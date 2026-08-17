import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Review {
  title: string;
  author: string;
  cover: string;
  date: string;
  rating: number;
  text: string;
}


@Component({
  selector: 'app-account',
  imports: [FormsModule],
  templateUrl: './account.html',
  styleUrl: './account.css'
})
export class Account {


  username = 'Virginia';

  email = 'Virginia@gmail.com';


  reviews: Review[] = [

    {
      title: 'The Botany of Desire',
      author: 'Michael Pollan',
      cover: 'https://covers.openlibrary.org/b/isbn/9780375760396-L.jpg',
      date: '6 Aug 2023',
      rating: 4.5,
      text: 'A gripping and beautifully written story that kept me hooked from the very first page.'
    },

    {
      title: 'The Botany of Desire',
      author: 'Michael Pollan',
      cover: 'https://covers.openlibrary.org/b/isbn/9780375760396-L.jpg',
      date: '6 Aug 2023',
      rating: 4.5,
      text: 'A gripping and beautifully written story that kept me hooked from the very first page.'
    },

    {
      title: 'The Botany of Desire',
      author: 'Michael Pollan',
      cover: 'https://covers.openlibrary.org/b/isbn/9780375760396-L.jpg',
      date: '6 Aug 2023',
      rating: 4.5,
      text: 'A gripping and beautifully written story that kept me hooked from the very first page.'
    }

  ];



  saveChanges(): void {

    console.log({
      username: this.username,
      email: this.email
    });

    // Later:
    // PUT /api/account

  }



  deleteReview(index: number): void {

    this.reviews.splice(index, 1);

    // Later:
    // DELETE /api/reviews/:id

  }



  scrollToSection(section: string): void {

    document
      .getElementById(section)
      ?.scrollIntoView({
        behavior: 'smooth'
      });

  }


}