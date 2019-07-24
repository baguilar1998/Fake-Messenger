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
      this.friendService.getFriends.subscribe((data) => {
        this.friends = data;
      });
  }

  ngOnInit() {}


  getFriend(friend: User) {
    this.friendService.setSelectedFriend(friend);
  }

}
