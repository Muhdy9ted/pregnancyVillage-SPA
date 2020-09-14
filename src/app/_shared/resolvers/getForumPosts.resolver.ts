import { Injectable } from '@angular/core';
import { ForumService } from '../services/forum.service';
import { Router, Resolve } from '@angular/router';
import { of, Observable } from 'rxjs';
import { GetPost } from '../models/getPost';
import { AlertifyService } from '../services/alertify.service';
import { catchError } from 'rxjs/operators';


@Injectable()
export class GetForumPostsResolver implements Resolve<GetPost[]> {

    constructor( private forumService: ForumService, private router: Router, private alertify: AlertifyService) {}

    resolve(): Observable<GetPost[]> {
        return this.forumService.getPosts().pipe(
            catchError(error => {
                // console.log(error);
                this.alertify.error('error in retreiving data, please retry');
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}
