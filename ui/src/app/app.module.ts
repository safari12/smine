import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NavigationModule } from './navigation/navigation.module';
import { AuthModule } from './auth/auth.module';
import { OverviewComponent } from './overview/overview.component';
import { RigModule } from './rig/rig.module'

@NgModule({
  declarations: [AppComponent, OverviewComponent],
  imports: [BrowserModule, AppRoutingModule, NavigationModule, NgbModule, AuthModule, RigModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
