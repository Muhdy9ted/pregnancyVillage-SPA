import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {


  spin = false;
  errorMessage1: string;
  errorMessage2: string;
  forgotPassword = false;

  constructor(public authService: AuthService, private router: Router, private alertify: AlertifyService) {
   {
    router.events
      .subscribe(console.log);
  }
  }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    this.spin = true;
    if (!this.forgotPassword) {
      this.authService.loginModal().subscribe((response) => {
        this.spin = false;
        form.reset();
      // tslint:disable-next-line: no-shadowed-variable
      }, error => {
        this.spin = false;
        this.errorMessage1 = error;
      }, () => {
        this.alertify.success(`Welcome back ${this.authService.decodedToken?.firstName}`);
        this.router.navigate(['/admin/dashboard']);
      });
    } else {
      this.authService.forgotPassword().subscribe((response) => {
        // console.log(response);
        form.reset();
        // this.loginForm.reset();
        this.forgotPassword = false;
      // tslint:disable-next-line: no-shadowed-variable
      }, error => {
        this.spin = false;
        // console.log(error);
        this.errorMessage2 = 'check your email address and try again';
      }, () => {
        this.alertify.success('Welcome back');
        this.spin = false;
        this.router.navigate(['/']);
      });
    }
  }
}
