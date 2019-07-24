import { Injectable } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../typescriptmodels/User';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private friends: User[];
  selectedFriend;
  firstSelectedFriend: Subject<User> = new Subject<User>();
  getFriends: Subject<User[]> = new Subject<User[]>();
  selectedFriendChange: Subject<User> = new Subject<User>();
  friendsUpdated: Subject<User[]> = new Subject<User[]>();

  constructor(private http: HttpClient,
    private userService: UserService) {
      this.fetchFriends().pipe(map((data => {
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
        this.setSelectedFriend(this.friends[0]);
        this.getFirstFriend();
        this.getFriends.next(this.friends);
      });
  }


  /**
   * @param friend the friend that the user clicks on
   */
  setSelectedFriend(friend) {
    this.selectedFriend = friend;
    this.selectedFriendChange.next(friend);
  }

  /**
   * @return the selected friend that the user clicked
   * on
   */
  getSelectedFriend() {
    return this.selectedFriend;
  }

  /**
   * @return Obersavable of all the users in the database
   */
  fetchFriends() {
    return this.http.get<{allUsers: any}>('//localhost:3000/api/friends/allUsers');
  }

  getFirstFriend() {
    this.firstSelectedFriend.next(this.selectedFriend);
  }
}
