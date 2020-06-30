import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ForumService } from 'src/app/_shared/services/forum.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  clickedSignUp = false;
  clickedLogin = false;
  isCollapsed = false;
  userId = this.authService.userID;
  topics: [];
  post: any;
  displayModal: boolean;
  // posts: GetPost[];
  // categoryPosts: Category[];
  // postsBycategory: Category[] = [];

  constructor(public authService: AuthService, private route: Router, private router: ActivatedRoute, public forumService: ForumService) { }

  ngOnInit(): void {
    this.showModalDialog();
  }

  showModalDialog() {
    this.displayModal = true;
  }

  onSignupClicked() {

    this.clickedSignUp = true;
  }

  onLoginClicked() {
    this.route.navigate(['/']);
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
