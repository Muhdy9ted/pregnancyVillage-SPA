import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCred } from 'src/app/_shared/models/user-cred.model';
import { UserService } from 'src/app/_shared/services/user.service';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: UserCred[];
  displayModal: boolean;
  user: UserCred;

  constructor(private route: ActivatedRoute, private userService: UserService, private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.users = data.users;
      // console.log(this.users);
    });
  }

  showInfo(user: UserCred) {
    this.user = user;
    this.displayModal = true;
  }

  suspendUser(id: any) {
    if (confirm(' This action will suspend the user indefinitely')) {
      // console.log(id);
      this.userService.suspendUser(id).subscribe((response) => {
        // console.log(response);
        this.alertify.success('user has been suspended');
      }, error => {
        // console.log(error);
        this.alertify.error('error suspending user, please retry');
      }, () => {
        // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        // this.router.onSameUrlNavigation = 'reload';
        // this.router.navigate(['/admin/users-list']);
        window.location.reload();
        // this.router.navigate([this.route.url]);
      });
    }
  }

  unsuspendUser(id: any) {
    if (confirm(' This action will unsuspend the user')) {
      // console.log(id);
      this.userService.unsuspendUser(id).subscribe((response) => {
        // console.log(response);
        this.alertify.success('user has been unsuspended');
      }, error => {
        // console.log(error);
        this.alertify.error('error unsuspending user, please retry');
      }, () => {
        // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        // this.router.onSameUrlNavigation = 'reload';
        // this.router.navigate(['/admin/users-list']);
        window.location.reload();
        // this.router.navigate([this.route.url]);
      });
    }
  }
}
