import { Injectable } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private friends = ['Brian Aguilar', 'John Smith', 'Adam Johnson', 'Tim Jones', 'Ricky Ricardo'];
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
