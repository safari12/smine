import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import AuthService from '../auth.service'
import { first } from 'rxjs/operators'

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth.login.component.html',
  styleUrls: ['./auth.login.component.css']
})
export class AuthLoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  submitted = false
  error = ''

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  get f() {
    return this.loginForm.controls
  }

  onSubmit() {
    this.submitted = true

    if (this.loginForm.invalid) {
      return
    }

    this.authService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['/'])
        },
        error => {
          this.error = error
        }
      )
  }
}
