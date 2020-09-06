import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ConfirmationTokenResolver implements Resolve<any> {
    constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router){}

    resolve(route: ActivatedRouteSnapshot): Observable<any>{
        return this.authService.confirmationToken(route.params.token).pipe(
                catchError(error => {
                    this.authService.confirmationTokenError = true;
                    this.authService.confrimationTokenErrorMsg = error;
                    this.alertify.error(error + " Please do your registration again");
                    return of(null);
              // this.alertify.error(error);
          })
        );
    }
}