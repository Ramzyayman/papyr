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


  login(): void {

    if (!this.email || !this.password) {
      return;
    }


    console.log({
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe
    });

    // Later:
    // POST /api/auth/login

  }

}