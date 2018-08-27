import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userSerivce: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Gets the token that is stored in the user service
    const authToken = this.userSerivce.getToken();
    // Manipulates the requests to hold the token (you must clone it before you do this)
    const authRequest = req.clone({
      // Sets the Auth Header that has been created to the current token
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(authRequest);
  }

}
