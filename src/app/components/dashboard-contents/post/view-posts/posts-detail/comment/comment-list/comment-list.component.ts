import { Component, OnInit, Input } from '@angular/core';
import { GetComment } from 'src/app/_shared/models/get-comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  @Input() comment: GetComment;

  constructor() { }

  ngOnInit(): void {
  }

}
