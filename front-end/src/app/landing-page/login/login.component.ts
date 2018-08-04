import { Component, OnInit } from '@angular/core';
import { User } from '../../typescriptmodels/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private signUp: boolean;
  public newUser: User;
  constructor() {
    this.signUp = false;
    this.newUser = new User();
  }

  ngOnInit() {
  }

  // Changes the sign up variable depending on what button the user clicks
  setSignUp(): void {
    this.signUp = !this.signUp;
  }

  // Checks to see if the user is on the sign up view
  checkSignUp(): boolean {
    return this.signUp;
  }

  // A function that will register the user into the database
  // YET TO BE IMPLEMENETED
  register(): void {
    console.log(this.newUser);
  }

}
