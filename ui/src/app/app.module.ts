import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NavigationModule } from './navigation/navigation.module'
import { AuthModule } from './auth/auth.module'
import { OverviewComponent } from './overview/overview.component'
import { RigModule } from './rig/rig.module'
import { ConfigurationComponent } from './configuration/configuration.component'
import { GpuModule } from './gpu/gpu.module'
import { MinerModule } from './miner/miner.module'
import { SharedModule } from './shared/shared.module'

@NgModule({
  declarations: [AppComponent, OverviewComponent, ConfigurationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavigationModule,
    NgbModule,
    AuthModule,
    RigModule,
    GpuModule,
    MinerModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
