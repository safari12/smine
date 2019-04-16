import { Component, Input, Output, EventEmitter } from '@angular/core'
import { GpuConfig } from '../gpu.config'

@Component({
  selector: 'app-gpu-config-table',
  templateUrl: './gpu.config.table.component.html',
  styleUrls: ['./gpu.config.table.component.css']
})
export class GpuConfigTableComponent {
  @Input() configs: GpuConfig[]

  @Output() onEdit = new EventEmitter<GpuConfig>()
  @Output() onDelete = new EventEmitter<GpuConfig>()

  edit(config: GpuConfig) {
    this.onEdit.emit(config)
  }

  delete(config: GpuConfig) {
    this.onDelete.emit(config)
  }
}
