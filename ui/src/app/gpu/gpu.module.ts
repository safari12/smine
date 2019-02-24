import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GpuConfigModule } from './config/gpu.config.module'

@NgModule({
  declarations: [],
  imports: [CommonModule, GpuConfigModule],
  exports: [GpuConfigModule]
})
export class GpuModule {}
