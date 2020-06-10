import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/_shared/services/forum.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { GetPost } from 'src/app/_shared/models/getPost';
import { Category } from 'src/app/_shared/models/category';

@Component({
  selector: 'app-posts-detail',
  templateUrl: './posts-detail.component.html',
  styleUrls: ['./posts-detail.component.scss']
})
export class PostsDetailComponent implements OnInit {

  post: GetPost;

  constructor(private forumService: ForumService, private route: ActivatedRoute, alertify: AlertifyService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.post = data.post.data;
      console.log(this.post);
    });
  }

}
