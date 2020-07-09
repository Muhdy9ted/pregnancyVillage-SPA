import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener} from '@angular/core';
import { UserService } from 'src/app/_shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { UserProfile } from 'src/app/_shared/models/user-profile.model';
// import { UserProfile } from 'src/app/_shared/models/userProfile';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { UpdateUser } from 'src/app/_shared/models/updateUser.model';
import { Route } from '@angular/compiler/src/core';
import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('password')  password: HTMLElement;
  @ViewChild('editForm') editForm: NgForm;
  // @ViewChild('emailError1', {static: true}) emailError1: ElementRef;

  user: UserProfile;
  changePassword = false;
  editProfileForm: FormGroup;
  spin = false;
  displayModal: boolean;
// phoneMask = ['(', '+', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/,  '-', /\d/, /\d/, /\d/, '-',  /\d/, /\d/];
  phoneMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/,  '-', /\d/, /\d/, /\d/, '-',  /\d/, /\d/];
  editProfile = false;
  beMerchant = false;
  provService = false;
  updateUser: UpdateUser;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editProfileForm.dirty) {
      $event.returnValue = true;
    }
  }

constructor(public userService: UserService, private route: ActivatedRoute, private authService: AuthService,
            private fb: FormBuilder, private alertify: AlertifyService, private router: Router) { }

ngOnInit(): void {
  this.route.data.subscribe( data => {
    this.userService.userProfileInfo = data.user.data;
    this.createEditProfileForm();
  });

  // runs on ngoninit


  // this.route.parent.paramMap.subscribe((params) => {
  //   console.log(params);
  // });

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
}

showModalDialogEP() {
  this.beMerchant = false;
  this.provService = false;
  this.editProfile = true;
  this.displayModal = true;
}

showModalDialogBM() {
  this.editProfile = false;
  this.provService = false;
  this.beMerchant = true;
  this.displayModal = true;
}

showModalDialogPS() {
  this.editProfile = false;
  this.beMerchant = false;
  this.provService = true;
  this.displayModal = true;
}

createEditProfileForm() {
  this.editProfileForm = this.fb.group({
    firstName: [this.userService.userProfileInfo.firstName, [Validators.required,  Validators.minLength(3),  Validators.maxLength(30)]],
    lastName:  [this.userService.userProfileInfo.lastName, [Validators.required,  Validators.minLength(3),  Validators.maxLength(30)]],
    email: [this.userService.userProfileInfo.email, [Validators.required, Validators.email]],
    phoneNumber: ['', []],
    // password: [null, [Validators.minLength(5)]],
    // confirmPassword: [null, [Validators.minLength(5)]],
    // uploadImage: [null, []],
  });
}

passwordMatchValidator(formData: FormGroup) {
  return formData.get('password').value === formData.get('confirmPassword').value ? null : {mismatch: true};
}

onClickChangePassword(formData: FormGroup) {
  this.changePassword = true;
  if (this.changePassword) {
    this.editProfileForm.get('password').setValidators([Validators.minLength(5), Validators.required]);
    this.editProfileForm.get('password').updateValueAndValidity();
    // console.log(this.editProfileForm.get('phoneNumber').value);
  }
  // console.log(this.editProfileForm.value);
  // this.editProfileForm.value.password ='';
  // console.log(this.editProfileForm.value);
  // console.log(this.password);
  // console.log(formData.value.password);
 }

onSubmit() {
  this.updateUser = Object.assign({}, this.editProfileForm.value);
  this.userService.updateUser(this.updateUser).subscribe(next => {
    // console.log(this.editProfileForm);
    this.displayModal = false;
    this.editProfileForm.reset();
    this.alertify.success('Profile updated successfully');
    this.router.navigate(['/' + this.authService.userID, 'dashboard']);
  }, error => {
    this.alertify.error(error);
  });

}

}
