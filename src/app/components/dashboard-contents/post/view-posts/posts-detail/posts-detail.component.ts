import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/_shared/services/forum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { GetPost } from 'src/app/_shared/models/getPost';
import { Category } from 'src/app/_shared/models/category.model';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { UpdatePost } from 'src/app/_shared/models/update-post.model';

@Component({
  selector: 'app-posts-detail',
  templateUrl: './posts-detail.component.html',
  styleUrls: ['./posts-detail.component.scss']
})
export class PostsDetailComponent implements OnInit {

  post: GetPost;
  trendingPosts: GetPost[];
  categories: Category[];
  // comments: GetComment[];
  likedPost = false;
  userId = this.authService.userID;
  updatePostDTO: UpdatePost;



  constructor(private forumService: ForumService, private route: ActivatedRoute, private alertify: AlertifyService,
              private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.post = data.post.data;
      console.log(this.post);
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

  deletePost() {
    if (confirm('Are you sure you want to delete post, deleted posts will be lost')) {
      this.forumService.deletePost(this.post._id).subscribe((response) => {
        this.alertify.success('topic was successfully deleted');
      }, error => {
        this.alertify.error('error deleting topic, please retry');
      }, () => {
        this.router.navigate(['/' + this.userId + '/posts/my-posts']);
      });
    }
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

  // reaction() {d
  //   if (!localStorage.getItem(this.post.topic)) {
  //     const formData = new FormData();
  //     formData.append('topic', this.post.topic);
  //     formData.append('category', this.post.category._id);
  //     formData.append('description', this.post.description);
  //     formData.append('upload_file', this.post.upload_file);

  //     this.forumService.updatePost(this.post._id).subscribe((response) => {
  //       this.post.likes++;
  //       this.likedPost = true;
  //       localStorage.setItem(this.post.topic, 'true');
  //       this.alertify.success('like added successfully');
  //     }, error => {
  //       console.log(error);
  //     }, () => {
  //       this.router.navigate(['forums/posts/' + this.post._id ]);
  //     });
  //   } else if (localStorage.getItem(this.post.topic)) {
  //     const formData = new FormData();
  //     formData.append('topic', this.post.topic);
  //     formData.append('category', this.post.category._id);
  //     formData.append('description', this.post.description); // [disabled]="postForm.invalid"
  //     formData.append('upload_file', this.post.upload_file);
  //     this.forumService.updatePost(this.post._id).subscribe((response) => {
  //       this.post.likes--;
  //       this.likedPost = false;
  //       localStorage.removeItem(this.post.topic);
  //       this.alertify.success('you unliked the post successfully');
  //     }, error => {
  //       console.log(error);
  //     }, () => {
  //       this.router.navigate(['forums/posts/' + this.post._id ]);
  //     });
  //   } else {
  //     alert('error');
  //   }
  // }

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
        this.post.likes ++;
      }, () => {
        this.router.navigate(['/forums/posts/' + this.post._id ]);
      });
    } else {
      alert('error');
    }
  }

  updatePost() {
    // console.log(this.forumService.updatePostDTO);
    this.forumService.updatePostDTO.topic = this.post.topic;
    this.forumService.updatePostDTO.description = this.post.description;
    this.forumService.updatePostDTO.comment = this.post.comment;
    this.forumService.updatePostDTO.categoryObj = this.post.category;
    // console.log(this.forumService.updatePostDTO);
    this.router.navigate(['/' + this.userId, 'posts', 'my-posts', this.post._id, 'edit-post']);
  }
}

