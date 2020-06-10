import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { ForumService } from '../services/forum.service';
import { Router, ActivatedRoute, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GetPost } from '../models/getPost';

@Injectable()
export class GetPostResolver implements Resolve<GetPost> {

    constructor(private forumService: ForumService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<GetPost> {
        return this.forumService.getPost(route.params.postId).pipe(
            catchError(error => {
                this.alertify.message('problem retrieving data');
                this.router.navigate(['dashboard']);
                return of(null);
            })
        );
    }
}
