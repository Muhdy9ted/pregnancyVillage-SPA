import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserProfile } from '../models/user-profile.model';
import { UpdateUser } from '../models/updateUser.model';
import { UserCred } from '../models/user-cred.model';
// import { UserProfile } from '../models/userProfile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = environment.apiUrl; // 'https://pregnancy-village.herokuapp.com/v1/forum/'
  userProfileInfo: UserProfile = new UserProfile();

  constructor(public http: HttpClient) { }

  userProfile() {
    return this.http.get(this.baseURL + 'users/profile');
  }

  listUsers() {
    return this.http.get(this.baseURL + 'auth/users').pipe(map((response: any) => response.data));
  }

  updateUser(user: UpdateUser): Observable<UpdateUser> {
    const {firstName, lastName, email, phoneNumber} = user;
    return this.http.put<UpdateUser>(this.baseURL + 'users/profile/update', {firstName, lastName, email, phoneNumber});
  }

  suspendUser(id: any) {
    return this.http.patch(this.baseURL + 'auth/users/suspend/' + id, {}); // Baseurll/forum/topic/approve/:id (PATCH)
  }

  unsuspendUser(id: any) {
    return this.http.patch(this.baseURL + 'auth/users/unsuspend/' + id, {}); // Baseurll/forum/topic/approve/:id (PATCH)
  }

  // updateProfile() {
  //   this.http.put()
  // }
}
