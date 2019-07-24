import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import {mimeType} from './mime-type.validator';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  authenticated = true;
  user;
  profilePreview = '../../../assets/avatar.png';
  private authListenerSub: Subscription;
  form: FormGroup;
  constructor(private activeModal: NgbActiveModal, private userService: UserService) {
    this.user = userService.currentUser;
  }

  ngOnInit() {
    this.userService.autoAuthUser();
    this.authListenerSub = this.userService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.authenticated = isAuthenticated;
      this.authenticated = this.userService.getAuthStatus();
    });
    this.form = new FormGroup({
      'firstName': new FormControl(this.user.firstName, {validators: [Validators.required]}),
      'lastName': new FormControl(this.user.lastName, {validators: [Validators.required]}),
      'email': new FormControl(this.user.email, {validators: [Validators.required]}),
      'password': new FormControl(this.user.password, {validators: [Validators.required]}),
      //'image': new FormControl(null, {asyncValidators: [mimeType]})
    });
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

  /**
   * Updates the user in the database
   */
  update() {
    this.user.firstName = this.form.value.firstName;
    this.user.lastName = this.form.value.lastName;
    this.user.email = this.form.value.email;
    this.user.password = this.form.value.password;
    this.userService.updateUser(this.user, this.form.value.image);
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
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    reader.onload = () => {
      this.profilePreview = reader.result;
      if (!this.form.get('image').valid) {
        window.alert('Not a valid picture');
        this.profilePreview = '../../../assets/avatar.png';
        this.form.patchValue({image: null});
      }
    };
    reader.readAsDataURL(file);

  }

  closeModal() {
    this.form.patchValue({image: null});
    this.activeModal.close();
  }
}
