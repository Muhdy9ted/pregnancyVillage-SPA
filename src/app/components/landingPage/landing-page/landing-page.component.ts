import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ForumService } from 'src/app/_shared/services/forum.service';
import { GetPost } from 'src/app/_shared/models/getPost';
import { Category } from 'src/app/_shared/models/category.model';
import { element } from 'protractor';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
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
  postsBycategory: Category[] = [];

  constructor(public authService: AuthService, private route: Router, private router: ActivatedRoute, public forumService: ForumService,
              private alertify: AlertifyService) { }

  ngOnInit(): void {
    // bgNavChange();

    this.router.data.subscribe(data => {
      // console.log(data);
      this.categoryPosts = data.categoryPosts;
      // tslint:disable-next-line: no-shadowed-variable
      this.categoryPosts.forEach(element => {
        this.forumService.postsByCategory(element._id).subscribe((response: any) => {
          this.postsBycategory.push(response.data);
        });
      });
      // console.log(this.postsBycategory);
    });
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

  loadForumTopics() {
    this.forumService.getPosts().subscribe((response: any) => {
      this.topics = response;
      // console.log( this.topics);
    });
  }

  postTopics() {
    this.forumService.createPost().subscribe((response: any) => {
      this.post = response;
    });
  }

  limitString(title, limit = 40) {
    const newTitle = [];
    // check if the length of the title is greater than limit before we editl
    if (title.length > limit) {
      // get the individual words in the title (#split()) then formulate (#reduce()) a new title lesser than the specified limit
      title.split(' ').reduce((acc, cur) => {
        if (acc + cur.length <= limit) {
            newTitle.push(cur);
          }
        return acc + cur.length; // update the accumulator for the next iteration
      }, 0);

      // return the result
      return `${newTitle.join(' ')}...`;
    }
    return title;
  }
}
