import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private userService: UserService,
    private chatService: ChatService) {
      this.chatService.chat = null;
      this.chatService.selectedFriend = null;
      this.chatService.messageLog = [];
     }

  ngOnInit() {
    if (!this.userService.currentUser) {
      this.userService.autoAuthUser();
    }
  }

}
