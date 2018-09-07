import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import {mimeType} from './mime-type.validator';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  authenticated = true;
  user;
  picture;
  profilePreview = '../../../assets/avatar.png';
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

  /**
   * Updates the user in the database
   */
  update() {
    this.userService.updateUser(this.user, this.picture);
    this.activeModal.close();
  }

  /**
   * Logs the user out
   */
  logout() {
    this.activeModal.close();
    this.userService.logout();
  }

  /**
   *
   * @param event user profile picture
   */
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.profilePreview = reader.result;
    };
    reader.readAsDataURL(file);
    this.picture = file;

  }

  closeModal() {
    this.picture = null;
    this.activeModal.close();
  }
}
