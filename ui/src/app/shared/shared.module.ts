import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ErrorInterceptor } from './error.intercepter'
import { AuthModule } from '../auth/auth.module'

@NgModule({
  imports: [CommonModule, AuthModule],
  providers: [ErrorInterceptor],
  exports: [CommonModule, FormsModule]
})
export class SharedModule {}
