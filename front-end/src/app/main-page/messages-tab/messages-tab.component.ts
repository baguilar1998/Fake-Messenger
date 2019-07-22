import { Component, OnInit } from '@angular/core';
import { SettingsComponent } from '../../modals/settings/settings.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  providers: [NgbActiveModal],
  selector: 'app-messages-tab',
  templateUrl: './messages-tab.component.html',
  styleUrls: ['./messages-tab.component.css']
})
export class MessagesTabComponent implements OnInit {

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

}
