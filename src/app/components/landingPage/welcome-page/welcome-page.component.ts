import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ForumService } from 'src/app/_shared/services/forum.service';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';

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
  message: string;
  // posts: GetPost[];
  // categoryPosts: Category[];
  // postsBycategory: Category[] = [];

  constructor(public authService: AuthService, private route: Router, private router: ActivatedRoute, public forumService: ForumService,
              private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.confirmationToken();
    this.showModalDialog();
  }

  confirmationToken() {
    this.authService.confirmationToken(this.router.snapshot.params.token).subscribe((response) => {
      this.message = "Your account has been activated, please sign-in to continue";
    }, error => {
      if (error) {
        this.message = error;
        // this.alertify.error(error);
    }});
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
