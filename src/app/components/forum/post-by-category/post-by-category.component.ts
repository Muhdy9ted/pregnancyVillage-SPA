import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/_shared/models/category.model';
import { ForumService } from 'src/app/_shared/services/forum.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { GetPost } from 'src/app/_shared/models/getPost';

@Component({
  selector: 'app-post-by-category',
  templateUrl: './post-by-category.component.html',
  styleUrls: ['./post-by-category.component.scss']
})
export class PostByCategoryComponent implements OnInit {

  catPosts: Category;
  trendingPosts: GetPost[];
  categories: Category[];
  posts: GetPost[];
  response;
  totalPosts;
  p = 1;

  constructor(private forumService: ForumService, private route: ActivatedRoute, alertify: AlertifyService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      // console.log(data);
      this.catPosts = data.catPosts.data;
      // console.log(this.catPosts);
      // this.comments = this.post.comment;
    });
    this.getTrendingPosts();
    this.getCategories();
  }

  getCategories() {
    this.forumService.getCategories().subscribe((response: any) => {
      // console.log(response);
      this.categories = response.data;
    });
  }

  getPost() {
    this.forumService.getPost(this.route.snapshot.params.postId).subscribe((response) => {
      // console.log(response);
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
