import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private friends = ['Brian Aguilar', 'John Smith', 'Adam Johnson', 'Tim Jones', 'Ricky Ricardo'
  ,'','','','','','','','','','','','','','','',''];
  private selectedFriend = this.friends[0];

  constructor() { }


  /**
   * @param friend the friend that the user clicks on
   */
  setSelectedFriend(friend) {
    this.selectedFriend = friend;
  }

  /**
   * @return the selected friend that the user clicked
   * on
   */
  getSelectedFriend() {
    return this.selectedFriend;
  }
  getFriends() {
    return this.friends;
  }

}
