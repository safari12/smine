import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ErrorInterceptor } from './error.intercepter'
import { AuthModule } from '../auth/auth.module'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { TokenInterceptor } from './token.intercepter'

@NgModule({
  imports: [CommonModule, AuthModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  exports: [CommonModule, FormsModule]
})
export class SharedModule {}
