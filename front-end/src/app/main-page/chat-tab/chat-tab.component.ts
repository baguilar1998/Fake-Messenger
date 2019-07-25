import { Component, OnInit} from '@angular/core';
import { UserService } from '../../services/user.service';
import { FriendService } from '../../services/friend.service';
import { SocketService } from '../../services/socket.service';
import { Message } from '../../typescriptmodels/Message';
import { ChatService } from '../../services/chat.service';
import { Chat } from 'src/app/typescriptmodels/Chat';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chat-tab',
  templateUrl: './chat-tab.component.html',
  styleUrls: ['./chat-tab.component.css']
})
export class ChatTabComponent implements OnInit {

  selectedFriend;
  messages: Message[] = [];
  subscription;
  chat: Chat;
  constructor(private userService: UserService,
    private friendService: FriendService,
    private chatService: ChatService,
    private socket: Socket) {
    this.subscription = friendService.selectedFriendChange.subscribe((data) => this.selectedFriend = data );
    this.selectedFriend = this.friendService.firstSelectedFriend.subscribe((data) => {
      this.selectedFriend = data;
    });
    this.socket.on('sendMessage', (message) => {

      if (this.userService.currentUser._id === message.author) {
        message.type = 0;
        this.chatService.messageLog.push(message);
      } else {
        message.type = 1;
        this.chatService.messageLog.push(message);
      }
    });
   }

  ngOnInit() {
    this.userService.autoAuthUser();
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
    this.chatService.sendMessage(message.message);
    this.socket.emit('sendMessage', message.message);
    (document.getElementById('res') as HTMLInputElement).value = '';
  }

  thumbsUp() {
    this.sendMessage('(y)');
  }

  setChat(chat) {
    this.chat = chat;
  }
}
