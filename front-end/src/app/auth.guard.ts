import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from './services/user.service';
@Injectable()
/**
 *  An angular feature that allows you to protect
 * certain routes depending on the circumstances
 */
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.userService.getAuthStatus();
    if (!isAuth) {
      this.router.navigate(['/']);
    }
    return isAuth;
  }

}
