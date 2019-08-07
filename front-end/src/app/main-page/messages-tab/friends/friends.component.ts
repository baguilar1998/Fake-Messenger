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
      this.getFriendsList();
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
    this.getFriendsList();
  }

  getFriendsList(): void {
    this.friendService.fetchFriends(this.userService.currentUser._id)
    .subscribe((data) => {
      this.currentFriends = data;
      this.users = this.currentFriends;
      this.friendService.setSelectedFriend(this.users[0]);
      this.friendService.getFirstFriend();
     // this.getFriends.next(this.friends);
     console.log(this.userService.currentUser.friends);
    });
  }
}
