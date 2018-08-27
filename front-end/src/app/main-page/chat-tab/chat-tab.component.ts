import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FriendService } from '../../services/friend.service';

@Component({
  selector: 'app-chat-tab',
  templateUrl: './chat-tab.component.html',
  styleUrls: ['./chat-tab.component.css']
})
export class ChatTabComponent implements OnInit {

  selectedFriend = this.friendService.getSelectedFriend();
  constructor(private userService: UserService, private friendService: FriendService) { }

  ngOnInit() {
    this.userService.autoAuthUser();
  }

  testFunction() {
    this.userService.getUser();
  }

}
