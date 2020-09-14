import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Category } from '../models/category.model';
import { ForumService } from '../services/forum.service';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class GetPostsByCategory implements Resolve<Category> {

    constructor(public forumService: ForumService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Category> {
        return this.forumService.postsByCategory(route.params.categoryId).pipe(
            catchError(error => {
                this.alertify.error('problem retrieving data');
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}
