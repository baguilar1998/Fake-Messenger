import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../typescriptmodels/User';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

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

    /**
     * Gets the user that logged in
     */
    this.http.post<{currentUser: string, message: string}>('//localhost:3000/api/users/getUser', this.newUser)
    .subscribe((data) => {
      console.log(data.currentUser);
      const temp  = data.currentUser;
      const user: User = {
        _id: temp._id,
        firstName: temp.firstName,
        lastName: temp.lastName,
        email: temp.email,
        password: temp.password
      };
      this.currentUser = user;
      this.currentUser.password = password;
      this.saveUser(user);
    });


  }

  /**
   * Updates any user information
   * @param user the user that is logged in
   */
  updateUser(user, image: File) {
    /**
     * Need this code to send the image file
     * (yet to be implemented)
     */
    const userData = new FormData();
    userData.append('_id', user._id);
    userData.append('firstName', user.firstName);
    userData.append('lastName', user.lastName);
    userData.append('email', user.email);
    userData.append('password', user.password);
    userData.append('image', image, 'profile-picture');

    this.http.post('//localhost:3000/api/users/updateUser', user)
    .subscribe((data) => {
      console.log('Updating user');
      this.newUser = {
        Email: user.email,
        Password: user.password
      };
      this.http.post<{currentUser: string, message: string}>('//localhost:3000/api/users/getUser', this.newUser)
      .subscribe((res) => {
        const temp = res.currentUser;
        const updatedUser: User = {
          _id: temp._id,
          firstName: temp.firstName,
          lastName: temp.lastName,
          email: temp.email,
          password: temp.password
        };
        this.currentUser = updatedUser;
        this.currentUser.password = this.newUser.Password;
        this.saveUser(updatedUser);
      });
    });

  }

  /**
   * Method that auto authenticates the user
   * (Keeps the user logged in as long as they haven't logged out)
   */
  autoAuthUser() {
    const authInformation = this.getAuthData();
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0 || expiresIn != null) {
      this.currentUser = authInformation.user;
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
   * Helper methodSaves the user into the local storage
   * @param user the user that logged in
   */
  private saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

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
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('date');
  }

  /**
   * Gets the authentication data from the local storage
   */
  private getAuthData() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('date');
    if (!token || !expirationDate) {
      return;
    }
    return {token: token, expirationDate: new Date(expirationDate), user: user};
  }

}
