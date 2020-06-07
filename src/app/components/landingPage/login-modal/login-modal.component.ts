import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { LoginDTO } from 'src/app/_shared/models/login-dto.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})

export class LoginModalComponent implements OnInit {

  @ViewChild('loginForm', {static: true}) loginForm: NgForm;
  @Output() closeModalClicked = new EventEmitter<void>();
  // user: LoginDTO = new LoginDTO();
  spin = false;
  errorMessage1: string;
  errorMessage2: string;
  forgotPassword = false;

  constructor(public authService: AuthService, private router: Router, private alertify: AlertifyService) { }

  ngOnInit(): void {
  }
  onCloseModal() {
    this.closeModalClicked.emit();
  }

  onSubmit() {
    this.spin = true;
    if (!this.forgotPassword) {
      this.authService.loginModal().subscribe((response) => {
        this.spin = false;
        this.onCloseModal();
        this.loginForm.reset();
      // tslint:disable-next-line: no-shadowed-variable
      }, error => {
        this.spin = false;
        this.errorMessage1 = error;
      }, () => {
        this.alertify.success(`Welcome back ${this.authService.decodedToken?.firstName}`);
        // this.router.navigate(['/dashboard']);
      });
    } else {
      this.authService.forgotPassword().subscribe((response) => {
        console.log(response);
        this.onCloseModal();
        this.loginForm.reset();
        this.forgotPassword = false;
      // tslint:disable-next-line: no-shadowed-variable
      }, error => {
        this.spin = false;
        console.log(error);
        this.errorMessage2 = 'check your email address and try again';
      }, () => {
        this.alertify.success('Welcome back');
        this.spin = false;
        this.router.navigate(['/']);
      });
    }
  }
}
