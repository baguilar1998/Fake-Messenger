import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chat-tab',
  templateUrl: './chat-tab.component.html',
  styleUrls: ['./chat-tab.component.css']
})
export class ChatTabComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.autoAuthUser();
  }

  testFunction() {
    this.userService.getUser();
  }

}
