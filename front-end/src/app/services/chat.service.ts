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

  // Information needed for each chat
  chat: Chat;
  messageLog: Message[] = [];
  // User that is logged in
  user;
  selectedFriend;


  constructor(private userService: UserService,
    private friendService: FriendService, private http: HttpClient) {
    if (userService.getAuthStatus() === true) {
      this.user = userService.currentUser;
      friendService.selectedFriendChange.subscribe((data) => this.selectedFriend = data );
      console.log(this.selectedFriend);
    }
  }

  sendMessage(message: string) {
    // Creates a new Message Object
    const newMessage = {
      // chatId: this.chat.id,
      body: message,
      author: this.user._id
    };

    // If the conversation didn't exist, then create a new one
    if (!this.chat) {
      this.createNewConversation(newMessage);
    } else {
      // Sends a message and stores it in the database
      this.http.post('//localhost:3000/api/chat/reply', message)
      .subscribe((data) => {
        // CODE TO BE IMPLEMENTED
        console.log('message sent');
      });
    }

  }

  private getConversation() {
    this.http.get('//localhost:3000/api/chat/getConversation')
    .subscribe((convo) => {
      // CODE TO BE IMPLEMENTED
    });

  }

  // A method to create a new conversation
  private createNewConversation(firstMessage) {
    const requiredInformation = {
      currentUser: this.user,
      newUser: this.selectedFriend,
      message: firstMessage,
    };
    console.log(requiredInformation);
    this.http.post('//localhost:3000/api/chat/newConversation', requiredInformation)
    .subscribe((data) => {
      // CODE TO BE IMPLEMENTED
      console.log('conversation started');
    });
  }

}
