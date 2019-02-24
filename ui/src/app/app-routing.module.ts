import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './auth/login/login.component'
import { OverviewComponent } from './overview/overview.component'
import { ConfigurationComponent } from './configuration/configuration.component'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'overview',
    component: OverviewComponent
  },
  {
    path: 'configuration',
    component: ConfigurationComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
