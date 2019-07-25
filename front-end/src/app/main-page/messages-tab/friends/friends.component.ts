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

  friends: User[];
  subscription;
  @Output() chat = new EventEmitter();
  constructor(private friendService: FriendService,
    private userService: UserService,
    private chatService: ChatService) {
      //this.friendService.getFriends.subscribe((data) => {
        //this.friends = data;
      //});
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
        this.friends = data;
        for (let i = 0 ; i < this.friends.length; i++) {
          if (this.friends[i]._id === this.userService.currentUser._id) {
            this.friends.splice(i, 1);
            break;
          }
        }
        this.friendService.setSelectedFriend(this.friends[0]);
        this.friendService.getFirstFriend();
       // this.getFriends.next(this.friends);
      });

  }

  ngOnInit() {}


  getFriend(friend: User) {
    this.friendService.setSelectedFriend(friend);
  }

}
