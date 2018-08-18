import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  authenticated = false;
  private authListenerSub: Subscription;
  constructor(private activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit() {
    this.authListenerSub = this.userService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.authenticated = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

}
