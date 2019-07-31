import { Injectable } from '@angular/core';
import { Subject, Observable } from '../../../node_modules/rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../typescriptmodels/User';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class FriendService {

  selectedFriend;
  firstSelectedFriend: Subject<User> = new Subject<User>();
  selectedFriendChange: Subject<User> = new Subject<User>();
  friendsUpdated: Subject<User[]> = new Subject<User[]>();

  constructor(private http: HttpClient) {}

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

  findPossibleUsers(user:string): Observable<any> {
    const request = {
      name: user
    };
    return this.http.post<any>('//localhost:3000/api/friends/findUsers', request);
  }

  getFirstFriend() {
    this.firstSelectedFriend.next(this.selectedFriend);
  }
}
