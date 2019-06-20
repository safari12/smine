import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationModule } from './navigation/navigation.module';
import { AuthModule } from './auth/auth.module';
import { OverviewComponent } from './overview/overview.component';
import { RigModule } from './rig/rig.module';
import { ConfigurationComponent } from './configuration/configuration.component';
import { GpuModule } from './gpu/gpu.module';
import { MinerModule } from './miner/miner.module';
import { TokenInterceptor } from './intercepters/token.intercepter';
import { ErrorInterceptor } from './intercepters/error.intercepter';
import { CoinModule } from './coin/coin.module';

@NgModule({
  declarations: [AppComponent, OverviewComponent, ConfigurationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavigationModule,
    AuthModule,
    NgbModule,
    RigModule,
    GpuModule,
    MinerModule,
    CoinModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
