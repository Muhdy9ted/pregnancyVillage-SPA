import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  onSubmit(form: NgForm) {
    this.spin = true;
    if (!this.forgotPassword) {
      this.authService.loginModal().subscribe((response) => {
        this.spin = false;
        form.reset();
        this.onCloseModal();
      // tslint:disable-next-line: no-shadowed-variable
      }, error => {
        this.spin = false;
        this.errorMessage1 = error;
      }, () => {
        this.alertify.success(`Welcome back ${this.authService.decodedToken?.firstName}`);
        this.router.navigate(['/']);
      });
    } else {
      this.authService.forgotPassword().subscribe((response) => {
        // console.log(response);
        form.reset();
        this.onCloseModal();
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
