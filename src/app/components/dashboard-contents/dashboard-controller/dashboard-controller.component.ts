import { Component, OnInit, ChangeDetectorRef, AfterViewInit, AfterViewChecked} from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-controller',
  templateUrl: './dashboard-controller.component.html',
  styleUrls: ['./dashboard-controller.component.scss']
})
export class DashboardControllerComponent implements OnInit, AfterViewInit, AfterViewChecked  {

  viewSelectedString: string;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }
  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }
  ngAfterViewInit(): void {
  //  console.log('here');
  }
  // ngAfterViewInit(): void {
  //   this.route.params.subscribe((params) => {
  //     console.log(params);
  //     if (params.userId !== this.authService.userID) {
  //       this.router.navigateByUrl('/page-not-found');
  //     }
  //   });
  //   this.cdr.detectChanges();
  // }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // console.log(params);
      if (params.userId !== this.authService.userID) {
        // this.router.navigate(['/' + this.authService.userID, 'dashboard']);
        this.router.navigateByUrl('/page-not-found');
        // console.log('false');
        // console.log(params);

      }
    });
    // this.route.params.subscribe((params) => {
    //   console.log(params);
    //   if (params.userId !== this.authService.userID) {
    //     this.router.navigateByUrl('/page-not-found');
    //     console.log('false');
    //   }
    // });

    // if (this.route.snapshot.params.userId !== this.authService.userID) {
    //   this.router.navigateByUrl('/page-not-found');
    // }
  }


  // this.route.params.subscribe((params) => {
  //   console.log(params);
  //   if (params.userId !== this.authService.userID) {
  //     this.router.navigateByUrl('/page-not-found');
  //   }
  // });

  // ngAfterViewInit() {
  //   this.message = 'all done loading :)'
  //   this.cdr.detectChanges();
  // }
  // ngAfterViewInit() {
  //   this.route.params.subscribe((params) => {
  //     console.log(params);
  //     if (params.userId !== this.authService.userID) {
  //       this.router.navigateByUrl('/page-not-found');
  //     }
  //   }
  // }

  // runs when theres a change in the url params
  // this.route.parent.params.subscribe((params) => {
  //   console.log(params);
  //   if (params.userId !== this.authService.userID) {
  //     console.log('false');
  //     console.log(this.authService.userID);
  //     this.router.navigate(['/page-not-found']);
  //   } else if (params.userId === this.authService.userID) {
  //     console.log(true);
  //     console.log(this.authService.userID);
  //   }
  // });
// }

  // this.cdr.detectChanges();

  // if (this.route.snapshot.parent.params.userId !== this.authService.userID) {
  //   this.router.navigateByUrl('/page-not-found');
  // }

  viewSelected(event: any) {
    // console.log(event);
    this.viewSelectedString = event;
  }
}
