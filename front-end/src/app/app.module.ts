import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './landing-page/login/login.component';

import { UserService } from './services/user.service';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MessagesTabComponent } from './main-page/messages-tab/messages-tab.component';
import { ChatTabComponent } from './main-page/chat-tab/chat-tab.component';
import { FriendsComponent } from './main-page/messages-tab/friends/friends.component';
import { SettingsComponent } from './modals/settings/settings.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { FriendService } from './services/friend.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    NotFoundComponent,
    MainPageComponent,
    MessagesTabComponent,
    ChatTabComponent,
    FriendsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [UserService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, FriendService],
  bootstrap: [AppComponent],
  entryComponents: [SettingsComponent]
})
export class AppModule { }
