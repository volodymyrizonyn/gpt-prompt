import { throwError as observableThrowError, Observable, retry } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('authorization', `Bearer ${this.authService.getToken() || ''}`),
    });
    return next.handle(authReq).pipe(
      retry(1),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && err.error.message === 'Token error: jwt expired') {
          this.authService.logout();
        }
        return observableThrowError(err);
      }),
    );
  }
}
