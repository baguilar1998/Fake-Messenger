import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../../services/friend.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends = this.friendService.getFriends();
  constructor(private friendService: FriendService) { }

  ngOnInit() {
  }

  getFriend(friend) {
    this.friendService.setSelectedFriend(friend);
  }

}
