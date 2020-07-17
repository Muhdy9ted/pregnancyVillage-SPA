import { Injectable } from '@angular/core';
import { UserCred } from '../models/user-cred.model';
import { Resolve, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class GetAllUsersResolver implements Resolve<UserCred[]> {
    constructor( private userService: UserService, private route: ActivatedRoute, private router: Router,
                 private alertify: AlertifyService) {}

    resolve(): Observable<UserCred[]> {
        return this.userService.listUsers().pipe(
            catchError(error => {
                console.log(error);
                this.alertify.message('problem retrieving data, please retry!');
                this.router.navigate(['/admin/dashboard']);
                return of(null);
            })
        );
    }
}
