import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/_shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  constructor(private userService: UserService, private route: ActivatedRoute, alertify: AlertifyService) { }

  ngOnInit(): void {
   this.getProfile();
   console.log('test');
  }

  getProfile() {
    this.userService.userProfile().subscribe((response: any) => {
      console.log(response);
    });
  }
}
