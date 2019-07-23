import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    if (!this.userService.currentUser) {
      this.userService.autoAuthUser();
    }
  }

}
