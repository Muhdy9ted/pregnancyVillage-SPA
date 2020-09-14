import { Injectable } from '@angular/core';
import { ForumService } from '../services/forum.service';
import { Router, ActivatedRoute, Resolve } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GetPost } from '../models/getPost';
import { Category } from '../models/category.model';

@Injectable()
export class GetCategoriesPostsLPageResolver implements Resolve<Category[]> {

    constructor(private forumService: ForumService, private router: Router, private alertify: AlertifyService) {}

    resolve(): Observable<Category[]> {
        return this.forumService.getPostsForLandingPage().pipe(
            catchError(error => {
                // console.log(error);
                this.alertify.error('error retrieving data, please refresh!');
                // this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}
