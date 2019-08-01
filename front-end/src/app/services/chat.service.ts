import { Injectable } from '@angular/core';
import { User } from '../typescriptmodels/User';
import { Message } from '../typescriptmodels/Message';
import { UserService } from './user.service';
import { FriendService } from './friend.service';
import { Chat } from '../typescriptmodels/Chat';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chat: Chat;
  messageLog: Message[] = [];
  user: User;
  selectedFriend: User;


  constructor(private userService: UserService,
  private friendService: FriendService,
  private http: HttpClient,
  private socket: Socket) {
    this.user = userService.currentUser;
    friendService.selectedFriendChange.subscribe((data) => {
      this.selectedFriend = data;
      this.getConversation(data);
    });

  }

  getConversation(selectedFriend: User): void {
    if(selectedFriend == null) {
      return;
    }
    const chatInfo = {
      users: [selectedFriend._id, this.user._id]
    };
    this.http.post<any>('//localhost:3000/api/chat/getConversation', chatInfo)
    .subscribe(
      (chat) => {
        console.log(chat);
        if (!chat) {
          this.messageLog = [];
          this.chat = null;
        } else {
          this.chat = chat;
          this.http.post<any>('//localhost:3000/api/chat/getMessages', chat)
          .subscribe((messages) => {
            this.messageLog = messages;
            console.log(this.messageLog);
            for (let i = 0; i < this.messageLog.length; i++) {
              if (this.messageLog[i].author === this.userService.currentUser._id) {
                this.messageLog[i].type = 0;
              } else {
                this.messageLog[i].type = 1;
              }
            }
          });
        }
      }
    );
  }

  newConversation(message) {
    const conversation = {
      users: [this.user._id, this.selectedFriend._id]
    };
    this.http.post<any>('//localhost:3000/api/chat/newConversation', conversation)
    .subscribe((newChat) => {
      this.friendService.addFriend(this.user._id, this.selectedFriend._id).subscribe(data => {
        console.log('friend has been added');
        this.chat = newChat;
        this.sendMessage(message);
      });
    });
  }

  sendMessage(message): void {
    if (!this.chat) {
      this.newConversation(message);
    } else {
      const newMessage = {
        chatId: this.chat._id,
        body: message,
        author: this.user
      }
      this.http.post<any>('//localhost:3000/api/chat/sendMessage', newMessage)
      .subscribe((data) => {
        this.socket.emit('sendMessage', data);
      });
    }

  }
}
