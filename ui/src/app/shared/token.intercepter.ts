import { Injectable } from '@angular/core'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http'
import AuthService from '../auth/auth.service'
import { Observable } from 'rxjs'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = this.authService.getCurrentUser
    if (currentUser && currentUser.token) {
      req = req.clone({
        setHeaders: {
          'x-access-token': currentUser.token
        }
      })
    }

    return next.handle(req)
  }
}
