import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { Router } from '@angular/router';
import { ForumService } from 'src/app/_shared/services/forum.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  clickedSignUp = false;
  clickedLogin = false;
  isCollapsed = false;
  userId = this.authService.userID;
  topics: [];
  post: any;
  constructor(public authService: AuthService, private route: Router, public forumService: ForumService) { }

  ngOnInit(): void {
    // this.postTopics();
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

  loadForumTopics() {
    this.forumService.getPosts().subscribe((response: any) => {
      this.topics = response;
      console.log( this.topics);
    });
  }

  postTopics() {
    this.forumService.createPost().subscribe((response: any) => {
      this.post = response;
    });
  }
}
