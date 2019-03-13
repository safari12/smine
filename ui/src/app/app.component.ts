import { Component } from '@angular/core'
import AuthService from './auth/auth.service'
import User from './user/user'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smine-ui'

  constructor(private authService: AuthService) {}

  get currentUser(): User {
    return this.authService.getCurrentUser
  }
}
