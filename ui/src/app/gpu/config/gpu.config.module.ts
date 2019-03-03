import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { GpuConfigTableComponent } from './table/gpu.config.table.component'
import { GpuConfigTableHeaderComponent } from './table/header/gpu.config.table.header.component'
import { GpuConfigModalComponent } from './modal/gpu.config.modal.component'
import GpuConfigService from './gpu.config.service'

@NgModule({
  declarations: [
    GpuConfigTableComponent,
    GpuConfigTableHeaderComponent,
    GpuConfigModalComponent
  ],
  providers: [GpuConfigService],
  entryComponents: [GpuConfigModalComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  exports: [GpuConfigTableComponent, GpuConfigTableHeaderComponent]
})
export class GpuConfigModule {}
