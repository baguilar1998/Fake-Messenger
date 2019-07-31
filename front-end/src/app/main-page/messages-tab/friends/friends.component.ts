import { Component, OnInit, Output } from '@angular/core';
import { FriendService } from '../../../services/friend.service';
import { map } from 'rxjs/operators';
import { UserService } from '../../../services/user.service';
import { ChatService } from 'src/app/services/chat.service';
import { EventEmitter } from 'events';
import { User } from 'src/app/typescriptmodels/User';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  users: User[];
  currentFriends: User[];
  didSearch: boolean;
  subscription;
  @Output() chat = new EventEmitter();
  constructor(private friendService: FriendService,
    private userService: UserService,
    private chatService: ChatService) {
      this.currentFriends = [];
      this.friendService.fetchFriends().pipe(map((data => {
        return data.allUsers.map(res => {
          return {
            _id: res._id,
            firstName: res.firstName,
            lastName: res.lastName,
            email: res.email,
            password: res.password
          };
        });
      })))
      .subscribe((data) => {
        this.currentFriends = data;
        this.users = this.currentFriends;
        for (let i = 0 ; i < this.users.length; i++) {
          if (this.users[i]._id === this.userService.currentUser._id) {
            this.users.splice(i, 1);
            break;
          }
        }
        this.friendService.setSelectedFriend(this.users[0]);
        this.friendService.getFirstFriend();
       // this.getFriends.next(this.friends);
      });
      this.didSearch = false;
  }

  ngOnInit() {}


  getFriend(friend: User) {
    this.friendService.setSelectedFriend(friend);
  }

  findPossibleUsers(user: string) {
    this.friendService.findPossibleUsers(user).subscribe(data => {
      this.users = data;
      this.didSearch = true;
    });
  }

  goBackToFriends() {
    this.didSearch = false;
    this.users = this.currentFriends;
  }
}
