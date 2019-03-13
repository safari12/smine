import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs'
import { shareReplay, tap, map } from 'rxjs/operators'

import User from '../user/user'

@Injectable()
export default class AuthService {
  private currentUserSubject: BehaviorSubject<User>
  public currentUser: Observable<User>

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    )
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get getCurrentUser(): User {
    return this.currentUserSubject.value
  }

  login(email: string, password: string) {
    return this.http.post<User>('/api/login', { email, password }).pipe(
      map(user => {
        this.setSession(user)
        return user
      }),
      shareReplay()
    )
  }

  logout() {
    localStorage.removeItem('currentUser')
    this.currentUserSubject.next(null)
  }

  private setSession(user: User) {
    if (user && user.token) {
      localStorage.setItem('currentUser', JSON.stringify(user))
      this.currentUserSubject.next(user)
    }
  }
}
