import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FriendService } from '../../services/friend.service';
import {Event} from '../../../client-enums';
import { SocketService } from '../../services/socket.service';
import { Message } from '../../typescriptmodels/Message';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-tab',
  templateUrl: './chat-tab.component.html',
  styleUrls: ['./chat-tab.component.css']
})
export class ChatTabComponent implements OnInit, OnDestroy {

  selectedFriend = this.friendService.getSelectedFriend();
  messages: Message[] = [];
  subscription;
  constructor(private userService: UserService, private friendService: FriendService,
  private socketService: SocketService, private chatService: ChatService) {
    // this.initIoConnection();
    this.subscription = friendService.selectedFriendChange.subscribe((data) => this.selectedFriend = data );
   }

  /* private initIoConnection(): void {
    this.socketService.initSocket();

   // this.ioConnection = this.socketService.onMessage()
     // .subscribe((message: Message) => {
       // this.messages.push(message);
     // });

    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });

    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }*/

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
    this.chatService.sendMessage(message.message);
    (document.getElementById('res') as HTMLInputElement).value = '';
  }

  thumbsUp() {
    this.sendMessage('(y)');
  }
}
