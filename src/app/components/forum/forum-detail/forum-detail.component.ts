import { Component, OnInit } from '@angular/core';
import { GetPost } from 'src/app/_shared/models/getPost';
import { ForumService } from 'src/app/_shared/services/forum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { Category } from 'src/app/_shared/models/category.model';
import { GetComment } from 'src/app/_shared/models/get-comment.model';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.scss']
})
export class ForumDetailComponent implements OnInit {

  post: GetPost;
  trendingPosts: GetPost[];
  categories: Category[];
  // comments: GetComment[];
  likedPost = false;


  constructor(private forumService: ForumService, private route: ActivatedRoute, private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.post = data.post.data;
      // console.log(this.post);
      // this.comments = this.post.comment;
    });
    // this.getPost();
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

  reaction() {
    if (!this.likedPost) {
      this.post.likes++;
      this.forumService.updateReactionsLike(this.post._id, this.post.likes).subscribe((response) => {
        this.likedPost = true;
        this.likedPost = true;
        this.alertify.success('like added successfully');
      }, error => {
        this.alertify.error('like wasn\'t added, please retry');
        this.post.likes--;
      }, () => {
        this.router.navigate(['/forums/posts/' + this.post._id ]);
      });
    } else if (this.likedPost) {
      this.post.likes--;
      this.forumService.updateReactionsUnlike(this.post._id, this.post.likes).subscribe((response) => {
        this.likedPost = false;
        this.alertify.success('you\'ve unliked the post successfully');
      }, error => {
        this.alertify.error('like wasn\'t added, please retry');
        this.post.likes++;
      }, () => {
        this.router.navigate(['/forums/posts/' + this.post._id ]);
      });
    } else {
      alert('error');
    }
  }
}
