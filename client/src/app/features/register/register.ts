import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  username = '';

  email = '';

  password = '';

  confirmPassword = '';


  errors = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };


  register(): void {

    this.clearErrors();


    if (!this.username.trim()) {
      this.errors.username = 'Username is required';
    }


    if (!this.email.trim()) {

      this.errors.email = 'Email is required';

    } else if (!this.validateEmail(this.email)) {

      this.errors.email = 'Enter a valid email address';

    }


    if (!this.password) {

      this.errors.password = 'Password is required';

    } else if (this.password.length < 8) {

      this.errors.password =
        'Password must be at least 8 characters';

    }


    if (!this.confirmPassword) {

      this.errors.confirmPassword =
        'Please confirm your password';

    } else if (
      this.password !== this.confirmPassword
    ) {

      this.errors.confirmPassword =
        'Passwords do not match';

    }


    if (this.hasErrors()) {
      return;
    }


    console.log('Account created', {
      username: this.username,
      email: this.email
    });


    // Later:
    // POST /api/auth/register

  }



  validateEmail(email: string): boolean {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(email);

  }



  clearErrors(): void {

    this.errors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

  }



  hasErrors(): boolean {

    return Object.values(this.errors)
      .some(error => error !== '');

  }

}