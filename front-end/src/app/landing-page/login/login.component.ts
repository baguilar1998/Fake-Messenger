import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private signUp: boolean;
  constructor() {
    this.signUp = false;
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

}
