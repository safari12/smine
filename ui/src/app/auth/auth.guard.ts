import { Injectable } from '@angular/core'
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate
} from '@angular/router'
import AuthService from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.getCurrentUser

    if (currentUser) {
      if (route.data.admin && !currentUser.admin) {
        this.router.navigate(['/'])
        return false
      }
      return true
    }

    this.router.navigate(['/login'])

    return false
  }
}
