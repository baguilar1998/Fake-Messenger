import { Component, OnInit, OnDestroy} from '@angular/core';
import { UserService } from '../../services/user.service';
import { FriendService } from '../../services/friend.service';
import { Message } from '../../typescriptmodels/Message';
import { ChatService } from '../../services/chat.service';
import { Chat } from 'src/app/typescriptmodels/Chat';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chat-tab',
  templateUrl: './chat-tab.component.html',
  styleUrls: ['./chat-tab.component.css']
})
export class ChatTabComponent implements OnInit, OnDestroy {

  selectedFriend;
  messages: Message[] = [];
  subscription;
  chat: Chat;
  isTyping: boolean;
  constructor(private userService: UserService,
    private friendService: FriendService,
    private chatService: ChatService,
    private socket: Socket) {
    this.subscription = friendService.selectedFriendChange.subscribe((data) => this.selectedFriend = data );
    this.selectedFriend = this.friendService.firstSelectedFriend.subscribe((data) => {
     if (data != null) {
      this.selectedFriend = data;
     } else {
      this.selectedFriend = {
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      };
     }
     this.isTyping = false;
    });
    // FIX LOGIC ON SENDING A MESSAGE
    this.socket.on('sendMessage', (m) => {
      const message = JSON.parse(m);
      if (this.chatService.chat === null) {
        return;
      } else if (message.chatId._id !== this.chatService.chat._id) {
        return;
      } else if (this.userService.currentUser._id === message.author) {
        message.type = 0;
        this.chatService.messageLog.push(message);
      } else {
        message.type = 1;
        this.chatService.messageLog.push(message);
      }
    });

    this.socket.on('isTyping', (res) => {
      console.log(res);
      if (res._id === this.userService.currentUser._id) {
        return;
      } else if (res.chatId._id !== this.chatService.chat._id) {
        return;
      } else if (res.typing) {
        this.isTyping = true;
      } else if (!res.typing) {
        this.isTyping = false;
      }
    });

   }

  ngOnInit() {
    this.userService.autoAuthUser();
  }

  ngOnDestroy() {
    this.chatService.chat = null;
    this.chatService.selectedFriend = null;
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
    const typingMessage = {
      _id: this.userService.currentUser._id,
      text: ''
    };
    this.socket.emit('isTyping', typingMessage);
    (document.getElementById('res') as HTMLInputElement).value = '';
  }

  thumbsUp() {
    this.sendMessage('(y)');
  }

  setChat(chat) {
    this.chat = chat;
  }

  checkTyping(event): void {
    const typingMessage = {
      _id: this.userService.currentUser._id,
      chatId: this.chatService.chat,
      text: event.target.value
    };
    this.socket.emit('isTyping', typingMessage);
  }
}
