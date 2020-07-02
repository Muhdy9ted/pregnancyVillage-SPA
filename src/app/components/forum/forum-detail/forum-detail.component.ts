import { Component, OnInit } from '@angular/core';
import { GetPost } from 'src/app/_shared/models/getPost';
import { ForumService } from 'src/app/_shared/services/forum.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.scss']
})
export class ForumDetailComponent implements OnInit {

  post: GetPost;

  constructor(private forumService: ForumService, private route: ActivatedRoute, alertify: AlertifyService) { }

  ngOnInit(): void {
  //   this.route.data.subscribe(data => {
  //     this.post = data.post.data;
  //     console.log(this.post);
  //   });
  // }
    this.getPost();
  }

  getPost() {
    this.forumService.getPost(this.route.snapshot.params.postId).subscribe((response) => {
      console.log(response);
    });
  }
}
