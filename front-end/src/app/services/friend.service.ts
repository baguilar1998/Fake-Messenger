import { Injectable } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs';
import { User } from '../typescriptmodels/User';

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
  private selectedFriend;
  selectedFriendChange: Subject<string> = new Subject<string>();

  constructor() {
    this.selectedFriend = this.friends[0];
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
