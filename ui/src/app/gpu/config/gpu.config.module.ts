import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GpuConfigTableComponent } from './table/gpu.config.table.component'
import { GpuConfigTableHeaderComponent } from './table/header/gpu.config.table.header.component'
import { GpuConfigModalComponent } from './modal/gpu.config.modal.component'

@NgModule({
  declarations: [
    GpuConfigTableComponent,
    GpuConfigTableHeaderComponent,
    GpuConfigModalComponent
  ],
  entryComponents: [GpuConfigModalComponent],
  imports: [CommonModule],
  exports: [GpuConfigTableComponent, GpuConfigTableHeaderComponent]
})
export class GpuConfigModule {}
