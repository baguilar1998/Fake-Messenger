import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { User } from '../typescriptmodels/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * A function that logs the user into the meseenger app
   * @param email the given email from log in
   * @param password the given password from log in
   */
  login(email, password) {

    // Storing the given information from the log in model into an object
    const currentUser = {
      Email: email,
      Password: password
    };

    this.http.post('//localhost:3000/api/users/login', currentUser)
    .subscribe((data) => {
      console.log('Logging in');
    });
  }

  /**
   * A function that registers a new user into the application
   * (Stores the user in the database)
   * @param user a new user
   */
  register(user): void {
    this.http.post<User>('//localhost:3000/api/users/signup', user)
    .subscribe((responseData) => {
      console.log('Creating new user');
    });
  }
}
