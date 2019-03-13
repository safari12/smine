import { NgModule } from '@angular/core'
import { AuthLoginComponent } from './login/auth.login.component'
import { RouterModule } from '@angular/router'
import { AuthGuard } from './auth.guard'
import AuthService from './auth.service'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [AuthLoginComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [AuthGuard, AuthService],
  exports: [AuthLoginComponent]
})
export class AuthModule {}
