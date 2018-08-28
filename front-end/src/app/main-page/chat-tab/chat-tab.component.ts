import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FriendService } from '../../services/friend.service';

@Component({
  selector: 'app-chat-tab',
  templateUrl: './chat-tab.component.html',
  styleUrls: ['./chat-tab.component.css']
})
export class ChatTabComponent implements OnInit, OnDestroy {

  selectedFriend = this.friendService.getSelectedFriend();
  subscription;
  constructor(private userService: UserService, private friendService: FriendService) {
    this.subscription = friendService.selectedFriendChange.subscribe((data) => this.selectedFriend = data );
   }

  ngOnInit() {
    this.userService.autoAuthUser();
  }

  ngOnDestroy() {
    this.subscription.unsubcribe();
  }

  testFunction() {
    this.userService.getUser();
  }

}
