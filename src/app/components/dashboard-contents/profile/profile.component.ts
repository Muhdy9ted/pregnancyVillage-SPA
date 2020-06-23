import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/_shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { UserProfile } from 'src/app/_shared/models/user-profile.model';
// import { UserProfile } from 'src/app/_shared/models/userProfile';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('password')  password: HTMLElement;
    // @ViewChild('emailError1', {static: true}) emailError1: ElementRef;

  user: UserProfile;
  changePassword = false;
  editProfileForm: FormGroup;
  spin = false;
// phoneMask = ['(', '+', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/,  '-', /\d/, /\d/, /\d/, '-',  /\d/, /\d/];
  phoneMask = ['(', '+', '2', '3', '4', ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/,  '-', /\d/, /\d/, /\d/, '-',  /\d/, /\d/];

  constructor(public userService: UserService, private route: ActivatedRoute,
              private fb: FormBuilder, alertify: AlertifyService) { }

  ngOnInit(): void {
    this.route.data.subscribe( data => {
      this.userService.userProfileInfo = data.user.data;
      this.createEditProfileForm();
    });
  }

  createEditProfileForm() {
    this.editProfileForm = this.fb.group({
      firstName: [this.userService.userProfileInfo.firstName, [Validators.required,  Validators.minLength(3),  Validators.maxLength(30)]],
      lastName:  [this.userService.userProfileInfo.lastName, [Validators.required,  Validators.minLength(3),  Validators.maxLength(30)]],
      email: [this.userService.userProfileInfo.email, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required]],
      password: [null, [Validators.minLength(5)]],
      confirmPassword: [null, [Validators.minLength(5)]],
      uploadImage: [null, []],
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(formData: FormGroup) {
    if (formData.value.password) {
      console.log(formData.value.password);
    } else {
      console.log('tester istired');
    }

    return formData.get('password').value === formData.get('confirmPassword').value ? null : {mismatch: true};

  }

  onClickChangePassword(formData: FormGroup) {
    this.changePassword = true;
    if (this.changePassword) {
      this.editProfileForm.get('password').setValidators([Validators.minLength(5), Validators.required]);
      this.editProfileForm.get('password').updateValueAndValidity();
      console.log(this.editProfileForm.get('phoneNumber').value);
    }
    // console.log(this.editProfileForm.value);
    // this.editProfileForm.value.password ='';
    // console.log(this.editProfileForm.value);
    // console.log(this.password);
    // console.log(formData.value.password);
   }

  onSubmit() {
    console.log('testing');
  }
}
