import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { User } from '../typescriptmodels/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  testString;
  constructor(private http: HttpClient) { }

  /*testFunction() {
    this.http.get<{text: String}>('//localhost:3000/api/users')
    .subscribe((data) => {
      this.testString = data.text;
    });
    window.alert(this.testString);
  }*/

  login(email, password) {
    this.http.get('//localhost:3000/api/users')
    .subscribe((data) => {
      console.log('Logging in');
    });
  }
  // A function that will register the user into the database
  register(user): void {
    this.http.post('//localhost:3000/api/users/signup', user)
    .subscribe((responseData) => {
      // some code
    });
  }
}
