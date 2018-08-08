import { Component, OnInit } from '@angular/core';
import { User } from '../../typescriptmodels/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private signUp: boolean;
  public newUser: User;
  constructor(private userService: UserService) {
    this.signUp = false;
    this.newUser = new User();
  }

  ngOnInit() {}

  // Changes the sign up variable depending on what button the user clicks
  setSignUp(): void {
    this.signUp = !this.signUp;
    this.newUser = new User();
  }

  // Checks to see if the user is on the sign up view
  checkSignUp(): boolean {
    return this.signUp;
  }

  // A function that will register the user into the database
  register(): void {
    this.userService.register(this.newUser);
  }

  // A function that logs the user in to the application
  login(): void {
    this.userService.login(this.newUser.email, this.newUser.password);
  }

}
