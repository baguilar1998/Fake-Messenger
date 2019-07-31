import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { SettingsComponent } from '../../modals/settings/settings.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from '@angular/core';
import { FriendsComponent } from './friends/friends.component';
import { FriendService } from 'src/app/services/friend.service';
@Component({
  providers: [NgbActiveModal],
  selector: 'app-messages-tab',
  templateUrl: './messages-tab.component.html',
  styleUrls: ['./messages-tab.component.css']
})
export class MessagesTabComponent implements OnInit {

  @Output() chat = new EventEmitter();
  @ViewChild(FriendsComponent) friends: FriendsComponent;
  searchedUser: string;
  constructor(private modalService: NgbModal,
    private friendService: FriendService) {
    this.searchedUser = '';
  }

  ngOnInit() {
  }

  openModal(type): void {
    switch (type) {
      case 'settings':
        const settings = this.modalService.open(SettingsComponent, {size: 'lg'});
        break;
    }
  }

  sendChat(chat) {
    this.chat.emit(chat);
  }

  findPossibleUsers(): void {
    this.friends.findPossibleUsers(this.searchedUser);
  }
}
