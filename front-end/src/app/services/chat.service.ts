import { Injectable } from '@angular/core';
import { User } from '../typescriptmodels/User';
import { Message } from '../../../node_modules/@angular/compiler/src/i18n/i18n_ast';
import { UserService } from './user.service';
import { FriendService } from './friend.service';
import { Chat } from '../typescriptmodels/Chat';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chat: Chat;
  messageLog: Message[] = [];
  user;
  selectedFriend;


  constructor(private userService: UserService,
  private friendService: FriendService, private http: HttpClient) {
    this.user = userService.currentUser;
    friendService.selectedFriendChange.subscribe((data) => this.selectedFriend = data );
  }

  getConversation(selectedFriend: User): void {
    this.http.post<any>('//localhost:3000/api/chat/getConversation', selectedFriend)
    .subscribe(
      (chat) => {
        if (chat.length === 0) {
          this.messageLog = [];
          this.chat = null;
        } else {
          // Create call to get all messages
          this.chat = chat;
        }
      }
    );
  }

  newConversation() {
    const conversation = {
      users: [this.user, this.selectedFriend]
    };
    this.http.post<any>('//localhost:3000/api/chat/newConversation', conversation);
  }

  sendMessage(message): void {
    if (!this.chat) {
      this.newConversation();
    }

  }
}
