import { Component,  OnInit  } from '@angular/core';
import * as AOS from 'aos';
import { AuthService } from './_shared/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'pregnancyvillage-front';
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    AOS.init();

    const token = localStorage.getItem('preg_token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      console.log(this.authService.decodedToken);
      this.authService.firstnameURL = this.authService.decodedToken?.firstName;
    }
  }
}
