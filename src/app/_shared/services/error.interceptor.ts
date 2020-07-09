import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, onErrorResumeNext, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })

export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                // console.log(error);
                // if (error.status === 412) {
                //     return throwError(error.error.data.msg);
                // }

                // if (error.status === 401) {
                //     return throwError(error.errror.data.msg);
                // }

                // if (error.status === 400) {
                //     let modalStateErrors = '';
                //     const badRequest = (error.error.data[0].constraints);
                //     console.log(badRequest);
                //     for (const key in badRequest) {
                //         if (badRequest[key]) {
                //             modalStateErrors += badRequest[key] + '\n';
                //         }
                //     }
                // }

                if (error instanceof HttpErrorResponse ) {
                    const applicationError = error.headers.get('Application-Error');
                    if (applicationError) {
                        return throwError(applicationError);
                    }
                    const serverError = error.error.data;
                    const serverError2 = Object.assign({}, serverError);
                    let modalStateErrors = '';
                    // console.log(serverError2);
                    if (serverError2 && typeof serverError2 === 'object') {
                        for (const key in serverError2) {
                            if (serverError2[key]) {
                                if (serverError2[0]) {
                                    modalStateErrors += serverError2[0].constraints.unique;
                                } else {
                                    modalStateErrors += serverError2[key] + '\n';
                                }

                            } // else {
                            //     const serverError2 = Object.assign({}, serverError);
                            //     console.log(typeof serverError + 'se', typeof serverError2 + 'se2');
                            //     // tslint:disable-next-line: no-shadowed-variable
                            //     for (const key in serverError2) {
                            //         if (serverError2[key]) {
                            //             modalStateErrors += serverError2[key] + '\n';
                            //         }
                            //     }
                            // }
                        }
                    }

                    return throwError(modalStateErrors || serverError2 || 'Server Error');
                }
            })
        );
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
