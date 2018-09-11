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
  messages = [
    {
      message: 'Hello friend !',
      user: 0
    },
    {
      message: 'Hey There !',
      user: 1
    },
    {
      message: 'How are you doing ?',
      user: 1
    },
    {
      message: 'Im doing well. How about you ?',
      user: 0
    }
  ];
  subscription;
  constructor(private userService: UserService, private friendService: FriendService) {
    this.subscription = friendService.selectedFriendChange.subscribe((data) => this.selectedFriend = data );
   }

  ngOnInit() {
    this.userService.autoAuthUser();
  }

  ngOnDestroy() {
  }

  /**
   *  Sends a message
   * @param event message that user entered
   */
  sendMessage(event) {
    let message;
    if (event === '(y)') {
      message = {
        message: '(y)',
        user: 0
      };
    } else {
      if (event.target.value === '') { return; }
      message = {
       message: event.target.value,
       user: 0
     };
    }
    this.messages.push(message);
    (document.getElementById('res') as HTMLInputElement).value = '';
  }

  thumbsUp() {
    this.sendMessage('(y)');
  }
}
