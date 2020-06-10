import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/_shared/services/forum.service';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { Router } from '@angular/router';
import { Post } from 'src/app/_shared/models/post.model';
import { GetPost } from 'src/app/_shared/models/getPost';
import { error } from 'protractor';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.scss']
})
export class ViewPostsComponent implements OnInit {

  // posts: GetPost[];

  constructor(public forumService: ForumService, private router: Router, private alertify: AlertifyService) { }

  ngOnInit(): void {
    // this.loadPosts();
  }

  // loadPosts() {
  //   this.forumService.getPosts().subscribe((response: any) => {
  //     this.posts = response.data;
  //   // tslint:disable-next-line: no-shadowed-variable
  //   }, error => {
  //     console.log(error);
  //   });
  // }
}
