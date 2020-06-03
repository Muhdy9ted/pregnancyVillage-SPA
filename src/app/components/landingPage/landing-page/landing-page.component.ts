import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  clickedSignUp = false;
  clickedLogin = false;
  isCollapsed = false;
  // firstname = this.authService.firstnameURL;
  firstname = this.authService.decodedToken?.firstName;


  constructor(public authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    console.log(this.firstname);
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
  }

}
