import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { ForumService } from '../services/forum.service';
import { Router, ActivatedRoute, Resolve } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GetPost } from '../models/getPost';

@Injectable()
export class GetPostsAdminResolver implements Resolve<GetPost[]> {

    constructor(private forumService: ForumService, private router: Router, private alertify: AlertifyService) {}

    resolve(): Observable<GetPost[]> {
        return this.forumService.getPosts().pipe(
            catchError(error => {
                this.alertify.error('problem retrieving data');
                this.router.navigate(['/admin/dashboard']);
                return of(null);
            })
        );
    }
}
