import { Injectable } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../typescriptmodels/User';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private friends: User[] = [{
    _id: 'sdfjisdo',
    firstName: 'Brian',
    lastName: 'Aguilar',
    email: 'brianaguilar1998@gmail.com',
    password: 'hashed'
  },
  {
    _id: 'sdfjisdo',
    firstName: 'Adam',
    lastName: 'Smith',
    email: 'asmith@yahoo.com',
    password: 'hashed'
  }];
  // private friends: User[];
  private selectedFriend;
  selectedFriendChange: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
    /*this.http.get<{allUsers: any}>('//localhost:3000/api/friends/allUsers')
    .pipe(map((data => {
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
      this.setSelectedFriend(this.friends[0]);
      console.log(this.selectedFriend);
    });*/
    this.setSelectedFriend(this.friends[0]);
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

}
