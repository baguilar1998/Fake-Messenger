import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { User } from '../typescriptmodels/User';
import { Subject } from 'rxjs';
import { Router } from '../../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private token: String;
  // Checks to see if the user is authenticated
  private authStatusListener = new Subject<boolean>();
  private authenticated = false;
  private currentUser;

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * @return a token (user auth)
   */
  getToken(): String {
    return this.token;
  }

  /**
   * @return authstatuslistener as an observable
   * so that no other values are added
   */
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getAuthStatus(): boolean {
    return this.authenticated;
  }
  /**
   * A function that logs the user into the meseenger app
   * @param email the given email from log in
   * @param password the given password from log in
   */
  login(email, password) {

    // Storing the given information from the log in model into an object
    this.currentUser = {
      Email: email,
      Password: password
    };

    this.http.post<{token: String}>('//localhost:3000/api/users/login', this.currentUser)
    .subscribe((data) => {
      const token = data.token;
      this.token = token;
      // Only authenticates a user if the token is valid
      if (token) {
        this.authStatusListener.next(true);
        this.authenticated = true;
        this.router.navigate(['/main']);
      }
    });
  }

  /**
   * Logs the user out of the main page
   */
  logout () {
    this.token = null;
    this.authenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
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
