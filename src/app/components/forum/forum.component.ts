import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/_shared/services/forum.service';
import { GetPost } from 'src/app/_shared/models/getPost';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  posts: GetPost[];

  constructor( private forumService: ForumService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.forumService.getPosts().subscribe((response: any) => {
      console.log(111, response.data);
      const result = response.data.sort((a, b) => {
        return a.createdAt < b.createdAt;
      });
      console.log(222, result);

      this.posts = result;
      console.log(this.posts);

    });
  }
}
