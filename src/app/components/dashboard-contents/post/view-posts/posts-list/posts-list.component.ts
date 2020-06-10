import { Component, OnInit } from '@angular/core';
import { GetPost } from 'src/app/_shared/models/getPost';
import { ForumService } from 'src/app/_shared/services/forum.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  posts: GetPost[];

  constructor(public forumService: ForumService, private router: Router, private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.posts = data.posts.data;
    });
  }

  loadPosts() {
    this.forumService.getPosts().subscribe((response: any) => {
      this.posts = response.data;
    // tslint:disable-next-line: no-shadowed-variable
    }, error => {
      console.log(error);
    });
  }
}
