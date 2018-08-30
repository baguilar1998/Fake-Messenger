import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  authenticated = true;
  user;
  private authListenerSub: Subscription;
  constructor(private activeModal: NgbActiveModal, private userService: UserService) {
    this.user = userService.currentUser;
  }

  ngOnInit() {
    this.authListenerSub = this.userService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.authenticated = isAuthenticated;
      this.authenticated = this.userService.getAuthStatus();
    });
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

  logout() {
    this.activeModal.close();
    this.userService.logout();
  }
}
