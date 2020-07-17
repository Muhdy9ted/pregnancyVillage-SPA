import { Component,  OnInit, OnDestroy  } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event, NavigationCancel, NavigationError, ActivatedRoute, Params } from '@angular/router';
import * as AOS from 'aos';
import { AuthService } from './_shared/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit,  OnDestroy {
  title = 'pregnancyvillage-front';
  jwtHelper = new JwtHelperService();
  showSpinner = false;
  mySubscription;


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

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
         // Trick the Router into believing it's last link wasn't previously loaded
         this.router.navigated = false;
      }
    });

  }

  ngOnInit() {
    // console.log('admin loades too');

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

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
