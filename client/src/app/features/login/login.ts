import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';

  password = '';

  rememberMe = false;


  errors = {
    email: '',
    password: ''
  };


  login(): void {

    this.clearErrors();


    if (!this.email.trim()) {

      this.errors.email = 'Email is required';

    } else if (!this.validateEmail(this.email)) {

      this.errors.email = 'Enter a valid email address';

    }


    if (!this.password) {

      this.errors.password = 'Password is required';

    }


    if (this.hasErrors()) {
      return;
    }


    console.log('Login attempt', {
      email: this.email,
      rememberMe: this.rememberMe
    });


    // Later:
    // POST /api/auth/login

  }



  validateEmail(email: string): boolean {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(email);

  }



  clearErrors(): void {

    this.errors = {
      email: '',
      password: ''
    };

  }



  hasErrors(): boolean {

    return Object.values(this.errors)
      .some(error => error !== '');

  }

}