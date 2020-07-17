import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_shared/services/user.service';
import { UserCred } from 'src/app/_shared/models/user-cred.model';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { ForumService } from 'src/app/_shared/services/forum.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  numberOfUsers: number;
  userCred: UserCred[];
  numberOfPosts: number;
  numberOfCategories: number;

  constructor( private userService: UserService, private alertify: AlertifyService, private forumService: ForumService ) { }

  ngOnInit(): void {
    this.listUsers();
    this.listPosts();
    this.listCategories();
  }

  listUsers() {
    this.userService.listUsers().subscribe((response) => {
      // tslint:disable-next-line: no-string-literal
      this.userCred = response;
      this.numberOfUsers = this.userCred.length;
      // tslint:disable-next-line: no-string-literal
      // console.log (response);
      // console.log(this.numberOfUsers);
      // console.log(this.userCred);
    });
  }

  listPosts() {
    this.forumService.getPosts().subscribe((response) => {
      // console.log(response);
      // tslint:disable-next-line: no-string-literal
      this.numberOfPosts = response['data'].length;
      // console.log(this.numberOfPosts);
    });
  }

  listCategories() {
    this.forumService.getCategories().subscribe((response) => {
      // console.log(response);
      // tslint:disable-next-line: no-string-literal
      this.numberOfCategories = response['data'].length;
    });
  }
}
