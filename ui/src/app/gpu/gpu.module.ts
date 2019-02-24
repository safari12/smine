import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ConfigModule } from './config/config.module'

@NgModule({
  declarations: [],
  imports: [CommonModule, ConfigModule],
  exports: [ConfigModule]
})
export class GpuModule {}
