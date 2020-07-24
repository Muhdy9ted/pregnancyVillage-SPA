import { Component, OnInit } from '@angular/core';
import { GetPost } from 'src/app/_shared/models/getPost';
import { ForumService } from 'src/app/_shared/services/forum.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { Category } from 'src/app/_shared/models/category.model';
import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  // posts: GetPost[];

  // constructor(public forumService: ForumService, private router: Router, private alertify: AlertifyService,
  //             private route: ActivatedRoute) { }

  // ngOnInit(): void {
  //   this.route.data.subscribe(data => {
  //     this.posts = data.posts.data;
  //   });
  // }

  // loadPosts() {
  //   this.forumService.getPosts().subscribe((response: any) => {
  //     this.posts = response.data;
  //   // tslint:disable-next-line: no-shadowed-variable
  //   }, error => {
  //     console.log(error);
  //   });
  // }


  posts: GetPost[];
  response;
  categories: Category[];
  trendingPosts: GetPost[];
  totalPosts;
  p = 1;
  userId = this.authService.userID;


  constructor( private forumService: ForumService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    // this.getPosts();
    this.route.data.subscribe(data => {
      // console.log(111, data.posts.data);
      this.response = data.posts.data;
      // const result = data.post.data.sort((a, b) => {
      //   return a.createdAt < b.createdAt;
      // });
      // console.log(222, result);

      // this.posts = result;
      // console.log(this.posts);
    });

    this.getLatestPosts();
    this.getCategories();
    this.getTrendingPosts();
  }

  getCategories() {
    this.forumService.getCategories().subscribe((response: any) => {
      // console.log(response);
      this.categories = response.data;
    });
  }

  getLatestPosts() {
    // this.forumService.getPosts().subscribe((response: any) => {
    //   console.log(111, response.data);
      const result = this.response.sort((a, b) => {
        return a.createdAt < b.createdAt;
      });
      // console.log(222, result);

      this.posts = result;
      // console.log(this.posts);
      this.totalPosts = this.posts.length;
    // });
  }

  getTrendingPosts() {
    this.forumService.getPosts().subscribe((response: any) => {
      // console.log(111, response.data);
      const result = response.data.sort((a, b) => {
        // console.log(a.totalCommentCount - b.totalCommentCount);
        // console.log(a.createdAt > b.createdAt);
        return a.createdAt < b.createdAt;
      });
      // console.log(222, result);
      const dateSort = result.sort((a, b) => {
        return b.totalCommentCount - a.totalCommentCount;
      });
      this.trendingPosts = dateSort.slice(0, 10);
      // console.log(dateSort);

    });
  }

  limitForumTitle(title, limit = 40) {
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

  limitForumpost(title, limit = 100) {
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
