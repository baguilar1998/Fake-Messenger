import { Injectable } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../typescriptmodels/User';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private friends: User[];
  selectedFriend;
  selectedFriendChange: Subject<string> = new Subject<string>();
  friendsUpdated: Subject<User[]> = new Subject<User[]>();

  constructor(private http: HttpClient) {
    this.fetchFriends();
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
   * @return all the current friends that the user has
   */
  getFriends() {
    return this.friends;
  }

  fetchFriends() {
    return this.http.get<{allUsers: any}>('//localhost:3000/api/friends/allUsers');
  }

}
