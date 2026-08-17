import { Injectable } from '@angular/core';

import { User } from '../shared/models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  private user: User = {

    id: 1,

    username: 'Virginia',

    email: 'Virginia@gmail.com'

  };



  getUser(): User {

    return this.user;

  }



  updateUser(user: User): void {

    this.user = user;

  }


}