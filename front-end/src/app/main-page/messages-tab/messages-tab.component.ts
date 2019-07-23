import { Component, OnInit, Output } from '@angular/core';
import { SettingsComponent } from '../../modals/settings/settings.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from '@angular/core';
@Component({
  providers: [NgbActiveModal],
  selector: 'app-messages-tab',
  templateUrl: './messages-tab.component.html',
  styleUrls: ['./messages-tab.component.css']
})
export class MessagesTabComponent implements OnInit {

  @Output() chat = new EventEmitter();
  constructor(private modalService: NgbModal) { }

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

}
