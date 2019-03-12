import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { shareReplay, tap } from 'rxjs/operators'

@Injectable()
export default class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<String>('/api/login', { email, password }).pipe(
      tap(res => this.setSession),
      shareReplay()
    )
  }
}
