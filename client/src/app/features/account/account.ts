import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UserReview } from '../../shared/models/user-review';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/user';


@Component({
  selector: 'app-account',
  imports: [FormsModule],
  templateUrl: './account.html',
  styleUrl: './account.css'
})
export class Account {


  user!: User;



  reviews: UserReview[] = [

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



  constructor(
    private userService: UserService
  ) {

    this.user = this.userService.getUser();

  }



  saveChanges(): void {


    this.userService.updateUser(this.user);


    console.log(this.user);


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