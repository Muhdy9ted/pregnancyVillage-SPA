import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = environment.apiUrl;

  constructor(public http: HttpClient) { }

  userProfile() {
    return this.http.get(this.baseURL + 'users/profile');
  }

  listUsers() {
    return this.http.get(this.baseURL + 'auth/users');
  }

  // updateProfile() {
  //   this.http.put()
  // }
}
