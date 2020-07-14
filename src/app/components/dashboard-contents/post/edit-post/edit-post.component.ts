import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/_shared/services/forum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  spin = false;
  updatedPost: any;
  category: any;
  // categories: Category[];
  categoriesValue = [];
  userId = this.authService.userID;

  constructor(public forumService: ForumService, private route: ActivatedRoute, private alertify: AlertifyService,
              private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onCategorySelected(event) {
    // console.log(event.target.value);
    this.forumService.updatePostDTO.categoryObj._id = event.target.value;
    // console.log(this.forumService.updatePostDTO.categoryObj._id);
  }

  onSubmit() {
    this.spin = true;
    this.forumService.updatePost(this.route.snapshot.params.postId).subscribe((response: any) => {
      this.updatedPost = response;
      // console.log(response);
      // console.log(this.createdPost);
    }, error => {
      this.spin = false;
      // console.log(error);
      this.alertify.error('your post wasn\'t updated, please retry!');
    }, () => {
      this.alertify.success('Post updated successfully');
      this.router.navigate(['/' + this.userId + '/posts/my-posts']);
    });
  }
}
