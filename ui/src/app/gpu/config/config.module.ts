import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GpuConfigTableComponent } from './table/gpu.config.table.component'
import { GpuConfigTableHeaderComponent } from './table/header/gpu.config.table.header.component'

@NgModule({
  declarations: [GpuConfigTableComponent, GpuConfigTableHeaderComponent],
  imports: [CommonModule],
  exports: [GpuConfigTableComponent, GpuConfigTableHeaderComponent]
})
export class ConfigModule {}
