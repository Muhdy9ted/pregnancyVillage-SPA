import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { RegisterUserDto } from 'src/app/_shared/models/register-user-dto.model';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  @Output() closeModalClicked = new EventEmitter<void>();
  @Output() cancelRegister = new EventEmitter();
  @ViewChild('registerForm', {static: true}) registerFormRef: NgForm;
  // @ViewChild('emailError1', {static: true}) emailError1: ElementRef;
  registerForm: FormGroup;
  user: RegisterUserDto;
  spin = false;
  emailError: string;
  regSent = false;
  displayModal: boolean;


  constructor(private fb: FormBuilder, private alertify: AlertifyService, private route: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.createRegisterForm();
    // if (this.regSent) {
    //   this.onRegSuccess();
    // }
  }


  createRegisterForm() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required,  Validators.minLength(3),  Validators.maxLength(30)]],
      lastName:  ['', [Validators.required,  Validators.minLength(3),  Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(formData: FormGroup) {
    return formData.get('password').value === formData.get('confirmPassword').value ? null : {mismatch: true};
  }

  onSubmit() {
    if (!this.regSent) {
      if (this.registerForm.valid) {
        this.spin = true;
        this.user = Object.assign({}, this.registerForm.value);
        this.authService.register(this.user).subscribe((userCredential) => {
          // this.onCloseModal();
          console.log(userCredential);
          this.alertify.success('Registration Successful');
          this.regSent = true;
          this.spin = false;
          this.alertify.success('A confirmation mail has been sent to your email');
        }, error => {
          if (error) {
            this.spin = false;
            this.emailError = error;
          }
        });
      }
    } else {
      if (this.registerForm.valid) {
        this.spin = true;
        // this.user = Object.assign({}, this.registerForm.value);
        this.authService.resendMail().subscribe((response: any)  => {
          console.log(response);
          this.onCloseModal();
          // this.registerFormRef.reset();
          this.alertify.success('Registration Successful');
          this.regSent = false;
          this.alertify.success('A confirmation mail has been sent to your email');
        }, error => {
          if (error) {
            this.spin = false;
            this.emailError = error;
            // const RegisterError = Object.entries(error);
            // console.log(RegisterError[7][1]);
            // const emailerror = RegisterError[7][1];
            // console.log(emailerror[0]);
            // const errorNow2 = error.error.Email[0];
            // console.log(errorNow2);
            // this.emailError = errorNow2;
            // document.getElementById('emailError1').textContent = error;
          }
        // }, () => {
        // create a loginredirect method that will receive the user data to login and the userCredentials already gotten from registration
        // this.authService.login(this.user).subscribe(() => {
        // this.router.navigate(['/dashboard']);
        // });
        });
      }
    }
  }

  onCloseModal() {
    this.closeModalClicked.emit();
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  showModalDialog() {
    this.displayModal = true;
  }

  onResendMailClicked() {
    this.authService.resendMail().subscribe((response: any) => {
      console.log(response);
    });
    this.route.navigate(['/']);
  }
}
