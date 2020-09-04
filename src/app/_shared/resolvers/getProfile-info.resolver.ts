import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { ForumService } from '../services/forum.service';
import { Router, ActivatedRoute, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GetPost } from '../models/getPost';
import { UserService } from '../services/user.service';

@Injectable()
export class GetProfileInfoResolver implements Resolve<GetPost> {

    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<GetPost> {
        return this.userService.userProfile().pipe(
            catchError(error => {
                this.alertify.error('error retrieving data, please retry!');
                this.router.navigate(['/forums/posts']);
                return of(null);
            })
        );
    }
}
