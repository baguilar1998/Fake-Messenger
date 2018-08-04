import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  testString;
  constructor(private http: HttpClient) { }

  testFunction() {
    this.http.get<{text: String}>('//localhost:3000/api/users')
    .subscribe((data) => {
      this.testString = data.text;
    });
    window.alert(this.testString);
  }
}
