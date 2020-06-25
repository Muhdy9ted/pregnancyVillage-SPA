import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ForumService } from 'src/app/_shared/services/forum.service';
import { GetPost } from 'src/app/_shared/models/getPost';
import { Category } from 'src/app/_shared/models/category.model';
// import * as bgNavChange from '../../../js/bgNavChange.js';


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
  posts: GetPost[];
  categoryPosts: Category[];

  constructor(public authService: AuthService, private route: Router, private router: ActivatedRoute, public forumService: ForumService) { }

  ngOnInit(): void {
    // bgNavChange();


    // this.router.data.subscribe(data => {
    //   console.log(data);
    // });

    if (this.isLoggedIn()) {
      console.log('login expired');
    } else {
        console.log('login valid');
        this.router.data.subscribe(data => {
        console.log(data);
        this.categoryPosts = data.categoryPosts;
        console.log(this.categoryPosts);
      });
    }

    // this.loadForumTopics();
    console.log('fuclk');
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
