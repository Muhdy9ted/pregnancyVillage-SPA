import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { LoginDTO } from '../models/login-dto.model';
import { map } from 'rxjs/operators';
import { RegisterUserDto } from '../models/register-user-dto.model';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // formDataRegister: RegisterDto = new RegisterDto();
  formDataLogin: LoginDTO = new LoginDTO();
  userToken: any;
  decodedToken: any;
  baseURL = environment.apiUrl + 'auth/';

  constructor(public http: HttpClient) { }

  register(user: RegisterUserDto): Observable<RegisterUserDto> {
    const {firstName, lastName, email, password} = user;
    return this.http.post<RegisterUserDto>(this.baseURL + 'register', {firstName, lastName, email, password});
  }

  loginModal() {
    return  this.http.post(this.baseURL + 'login', this.formDataLogin, httpOptions).pipe(map((response: HttpResponse<any>) => {
      console.log(response);
      const userResponse = Object.entries(response);
      if (userResponse) {
        localStorage.setItem('token', JSON.stringify(userResponse[0][1]));
        this.userToken = JSON.stringify(userResponse[0][1]);
        console.log(this.decodedToken);
        return this.userToken;
      }
      // if (response.state === 1) {
      //   localStorage.setItem('token', JSON.stringify(response.data));
      //   this.userToken = JSON.stringify(response.data);
      //   return this.userToken;
      // } else {
      //   return response;
      // }
    }));
  }

  forgotPassword() {
    const { username } = this.formDataLogin;
    console.log(username);
    return this.http.post(this.baseURL + 'reset_password', username);
  }
}
