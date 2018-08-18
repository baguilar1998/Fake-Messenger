import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { User } from '../typescriptmodels/User';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private token: String;
  // Checks to see if the user is authenticated
  private authStatusListener = new Subject<boolean>();
  private currentUser;

  constructor(private http: HttpClient) { }

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

    this.http.post<{token: String}>('//localhost:3000/api/users/login', currentUser)
    .subscribe((data) => {
      const token = data.token;
      this.token = token;
      this.authStatusListener.next(true);
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

  /**
   * Test function to check to see if the authentication worked or not
   */
  test(): void {
    this.http.post<String>('//localhost:3000/api/users/test', 'Test')
    .subscribe((data) => {
      console.log(data);
    });
  }

}
