import { Component, OnInit, Input } from '@angular/core';
import { GetComment } from 'src/app/_shared/models/get-comment.model';
import { ForumService } from 'src/app/_shared/services/forum.service';
import { Comment } from 'src/app/_shared/models/comment.model';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  @Input() comment: GetComment;
  likedComment = false;
  updateComment: Comment;
  constructor(public forumService: ForumService, public route: ActivatedRoute, public alertify: AlertifyService) { }

  ngOnInit(): void {
  }
  // onSubmit() {
  //   this.forumService.createCommentDto.forum_id = this.route.snapshot.params.postId;
  //   this.spin = true;
  //   // console.log(this.forumService.createCommentDto);
  //   this.forumService.createComment().subscribe((response: any) => {
  //     // console.log(response);
  //   }, error => {
  //     this.spin = false;
  //     this.alertify.message('unable to post your comment, please Login and try again');
  //     // console.log(error);
  //   }, () => {
  //     // this.alertify.success(`Welcome back ${this.authService.decodedToken?.firstName}`);
  //     this.alertify.success('comment sent successfully');
  //     this.forumService.createCommentDto = new Comment();
  //     this.upload_file.nativeElement.value = null;
  //     // this.upload_file.innerHTML = null;
  //     // const formData = new FormData();
  //     // formData.delete();


  //     // this.router.navigate(['/dashboard']);
  //   });
  // }
  // reaction() {
  //   if (!this.likedComment) {
  //     this.forumService.createCommentDto.forum_id = this.route.snapshot.params.postId;
  //     this.forumService.createComment(this.comment.forum_id, formData).subscribe((response) => {
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
  //     this.forumService.updatePost(this.post._id, formData).subscribe((response) => {
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
}
