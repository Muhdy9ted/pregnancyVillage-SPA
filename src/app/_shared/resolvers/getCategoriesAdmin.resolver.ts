import { Injectable } from '@angular/core';
import { ForumService } from '../services/forum.service';
import { Router, ActivatedRoute, Resolve } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../models/category.model';

@Injectable()
export class GetCategoriesAdminResolver implements Resolve<Category[]> {

    constructor(private forumService: ForumService, private router: Router, private alertify: AlertifyService) {}

    resolve(): Observable<Category[]> {
        return this.forumService.getCategories().pipe(
            catchError(error => {
                // console.log(error);
                this.alertify.message('error retrieving data, please refresh!');
                this.router.navigate(['/admin/dashboard']);
                return of(null);
            })
        );
    }
}
