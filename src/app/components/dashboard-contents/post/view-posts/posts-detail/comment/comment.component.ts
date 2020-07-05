import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ForumService } from 'src/app/_shared/services/forum.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { Comment } from 'src/app/_shared/models/comment.model';
import { GetComment } from 'src/app/_shared/models/get-comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  @ViewChild('upload_file') upload_file: ElementRef;
  spin = false;

  constructor( public forumService: ForumService, public route: ActivatedRoute, public alertify: AlertifyService) {}

  ngOnInit(): void {
  }

  onSubmit() {
    this.forumService.createCommentDto.forum_id = this.route.snapshot.params.postId;
    this.spin = true;
    console.log(this.forumService.createCommentDto);
    this.forumService.createComment().subscribe((response: any) => {
      console.log(response);
    }, error => {
      this.spin = false;
      this.alertify.message('unable to post your comment, please Login and try again');
      console.log(error);
    }, () => {
      // this.alertify.success(`Welcome back ${this.authService.decodedToken?.firstName}`);
      this.alertify.success('comment added successfully');
      this.forumService.createCommentDto = new Comment();
      this.upload_file.nativeElement.value = null;
      // this.upload_file.innerHTML = null;
      // const formData = new FormData();
      // formData.delete();


      // this.router.navigate(['/dashboard']);
    });
  }

  handleFileInput(files: FileList) {
    this.forumService.createCommentDto.comment_upload_file = files.item(0);
}
}
