import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../typescriptmodels/User';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private token: String;
  // Checks to see if the user is authenticated
  private authStatusListener = new Subject<boolean>();
  private authenticated = false;
  private newUser;
  currentUser;
  private tokenTimer: any;

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
    this.newUser = {
      Email: email,
      Password: password
    };

    // Sets up the token for the user
    this.http.post<{token: string, expiresIn: number}>('//localhost:3000/api/users/login', this.newUser)
    .subscribe((data) => {
      console.log('Logging user in');
      const token = data.token;
      this.token = token;
      // Only authenticates a user if the token is valid
      if (token) {
        const expiresInDuration = data.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationDate);
        this.authenticated = true;
        this.router.navigate(['/main']);
      }
    });

    this.http.post<{currentUser: string, message: string}>('//localhost:3000/api/users/getUser', this.newUser)
    .subscribe((data) => this.currentUser = data.currentUser);

  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0 || expiresIn != null) {
      this.token = authInformation.token;
      this.authenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      this.router.navigate(['/main']);
    }
  }

  /**
   * Logs the user out of the main page
   */
  logout () {
    this.token = null;
    this.authenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
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
      this.login(user.email, user.password);
    });
  }

  /**
   * A function that retrieves the user data
   * @return the current user that is logged in
   *
  getUser() {
    this.http.post<{currentUser: string, message: string}>('//localhost:3000/api/users/getUser', this.currentUser).subscribe((data) => {
      // console.log(data.currentUser);
      // return data;
    });
  }*.

  /**
   * A helper function that sets the Node.js timer
   * @param duration the current time
   */
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  /**
   * A helper method to keep the user logged in if they haven't log
   * out of their account or if the token hasn't expired using local
   * storage
   * @param token the current user that's logged in
   * @param expirationDate the duration of the token
   */
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('date', expirationDate.toISOString());
  }

  /**
   * Clears any auth data from the local storage
   */
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('date');
  }

  /**
   * Gets the authentication data from the local storage
   */
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('date');
    if (!token || !expirationDate) {
      return;
    }
    return {token: token, expirationDate: new Date(expirationDate)};
  }

}
