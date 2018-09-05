import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../../services/friend.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends;
  subscription;
  constructor(private friendService: FriendService) {
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
      console.log(this.friends);
      this.friendService.setSelectedFriend(this.friends[0]);
    });
   }

  ngOnInit() {
  }


  getFriend(friend) {
    this.friendService.setSelectedFriend(friend);
  }

}
