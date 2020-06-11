import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { UserProfile } from 'src/app/_shared/models/userProfile';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss']
})
export class MemberProfileComponent implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute, alertify: AlertifyService) { }

  userProfile: UserProfile;

  ngOnInit(): void {
   this.getProfile();
  }

  getProfile() {
    this.userService.userProfile().subscribe((response: any) => {
      this.userProfile = response.data;
      console.log(this.userProfile);
    });
  }
}
