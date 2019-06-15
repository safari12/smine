import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GpuConfigTableComponent } from './table/gpu.config.table.component';
import { GpuConfigTableHeaderComponent } from './table/header/gpu.config.table.header.component';
import { GpuConfigModalComponent } from './modal/gpu.config.modal.component';
import { GpuConfigComponent } from './gpu.config.component';
import { GpuConfigService } from './state/gpu.config.service';
import { GpuConfigQuery } from './state/gpu.config.query';

@NgModule({
  declarations: [
    GpuConfigTableComponent,
    GpuConfigTableHeaderComponent,
    GpuConfigModalComponent,
    GpuConfigComponent
  ],
  providers: [GpuConfigService, GpuConfigQuery],
  entryComponents: [GpuConfigModalComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  exports: [
    GpuConfigTableComponent,
    GpuConfigTableHeaderComponent,
    GpuConfigComponent
  ]
})
export class GpuConfigModule {}
