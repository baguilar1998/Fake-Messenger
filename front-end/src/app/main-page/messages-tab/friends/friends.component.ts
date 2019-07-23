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
  constructor(private friendService: FriendService,
    private userService: UserService) {
      this.friendService.getFriends.subscribe((data) => {
        this.friends = data;
      });
  }

  ngOnInit() {}


  getFriend(friend) {
    this.friendService.setSelectedFriend(friend);
  }

}
