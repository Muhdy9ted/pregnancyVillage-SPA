import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  clickedSignUp = false;
  clickedLogin = false;
  isCollapsed = false;
  // firstname = this.authService.firstnameURL;
  userId = this.authService.userID;


  constructor(public authService: AuthService, private route: Router, private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  onSignupClicked() {
    this.clickedSignUp = true;
  }

  onLoginClicked() {
    this.clickedLogin = true;
  }

  onSignupCloseModalClicked() {
    this.clickedSignUp = false;
  }

  onSigninCloseModalClicked() {
    this.clickedLogin = false;
  }

  isLoggedIn() {
    return this.authService.loggedIn();
  }

  loggedOut() {
    this.authService.loggedOut();
    this.route.navigate(['/']);
    this.alertify.success('logged out successfully');

  }

}
