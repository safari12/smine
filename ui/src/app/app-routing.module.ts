import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthLoginComponent } from './auth/login/auth.login.component'
import { OverviewComponent } from './overview/overview.component'
import { ConfigurationComponent } from './configuration/configuration.component'
import { AuthGuard } from './auth/auth.guard'

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'configuration',
    component: ConfigurationComponent,
    canActivate: [AuthGuard],
    data: {
      admin: true
    }
  },
  {
    path: 'login',
    component: AuthLoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
