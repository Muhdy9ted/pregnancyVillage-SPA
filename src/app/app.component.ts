import { Component,  OnInit  } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event, NavigationCancel, NavigationError, ActivatedRoute, Params } from '@angular/router';
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
  showSpinner = false;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showSpinner = true;
      } else if (routerEvent instanceof NavigationEnd
        || routerEvent instanceof NavigationError
        || routerEvent instanceof NavigationCancel) {
        this.showSpinner = false;
      }
    });
  }

  ngOnInit() {

    AOS.init();

    const token = localStorage.getItem('preg_token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      const userEmail = this.authService.decodedToken.email;
      const pos = userEmail.indexOf('@');
      this.authService.userID = userEmail.substring(0, pos );
      // console.log(this.authService.decodedToken);
      // this.authService.userIdURL = this.authService.decodedToken?.userId;
    }
  }
}
