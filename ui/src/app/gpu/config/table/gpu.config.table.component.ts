import { Component, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { GpuConfigModalComponent } from '../modal/gpu.config.modal.component'
import GpuConfigService from '../gpu.config.service'

@Component({
  selector: 'app-gpu-config-table',
  templateUrl: './gpu.config.table.component.html',
  styleUrls: ['./gpu.config.table.component.css']
})
export class GpuConfigTableComponent implements OnInit {
  configs = []
  selectedConfig: any = null

  constructor(
    private modalService: NgbModal,
    private service: GpuConfigService
  ) {}

  ngOnInit() {
    this.service.getAll().subscribe(configs => {
      this.configs = configs
    })
  }

  openConfig(config, idx) {
    const modalRef = this.modalService.open(GpuConfigModalComponent, {
      size: 'lg'
    })
    modalRef.componentInstance.config = config
    modalRef.componentInstance.updateConfigEvent.subscribe(config => {
      this.configs[idx] = config
    })
  }

  removeConfig(idx) {
    this.configs.splice(idx, 1)
  }
}
