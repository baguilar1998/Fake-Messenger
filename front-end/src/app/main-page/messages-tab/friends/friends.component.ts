import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../../services/friend.service';
import { map } from 'rxjs/operators';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends;
  subscription;
  constructor(private friendService: FriendService, private userService: UserService) {
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
      // Doesn't display the user that's logged in [O(n)]
      for (let i = 0 ; i < this.friends.length; i++) {
        if (this.friends[i]._id === this.userService.currentUser._id) {
          this.friends.splice(i, 1);
          break;
        }
      }
      this.friendService.setSelectedFriend(this.friends[0]);
    });
   }

  ngOnInit() {
  }


  getFriend(friend) {
    this.friendService.setSelectedFriend(friend);
  }

}
