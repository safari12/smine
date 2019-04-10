import { Injectable } from '@angular/core'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http'
import AuthService from '../auth/auth.service'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Router } from '@angular/router'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        if (
          this.router.url !== '/login' &&
          [401, 403].indexOf(err.status) !== -1
        ) {
          this.authService.logout()
          location.reload(true)
        }

        const error = err.error.message || err.statusText
        return throwError(error)
      })
    )
  }
}
