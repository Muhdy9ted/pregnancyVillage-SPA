import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {

  constructor(private router: Router, private authService: AuthService, private alertify: AlertifyService) {}

  canActivate(): boolean {
    if (!this.authService.loggedIn()) {
      return true;
    }
    this.alertify.error('Please Login first');
    this.router.navigate(['']);
    return false;
  }

  canActivateChild(): boolean {
    return true;
  }

  canDeactivate(): boolean {
    return true;
  }

  canLoad(): boolean {
    return true;
  }
}
