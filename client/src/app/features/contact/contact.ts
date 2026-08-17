import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {


  name = '';

  email = '';

  topic = '';

  message = '';



  topics = [

    'Book Inquiry',

    'Technical Support',

    'Account Issue',

    'Other'

  ];



  errors = {

    name: '',

    email: '',

    topic: '',

    message: ''

  };




  sendMessage(): void {


    this.clearErrors();



    if (!this.name.trim()) {

      this.errors.name = 'Name is required';

    }


    if (!this.email.trim()) {

      this.errors.email = 'Email is required';

    }
    else if (!this.validateEmail(this.email)) {

      this.errors.email = 'Enter a valid email';

    }



    if (!this.topic) {

      this.errors.topic = 'Select a topic';

    }



    if (!this.message.trim()) {

      this.errors.message = 'Message is required';

    }



    if (this.hasErrors()) {

      return;

    }



    console.log({

      name: this.name,

      email: this.email,

      topic: this.topic,

      message: this.message

    });



    // Later:
    // POST /api/contact


  }





  validateEmail(email: string): boolean {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  }




  clearErrors(): void {

    this.errors = {

      name: '',

      email: '',

      topic: '',

      message: ''

    };

  }





  hasErrors(): boolean {

    return Object.values(this.errors)
      .some(error => error !== '');

  }


}