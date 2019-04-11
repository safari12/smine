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

  constructor(
    private modalService: NgbModal,
    private service: GpuConfigService
  ) {}

  ngOnInit() {
    this.service.modelSource.subscribe(configs => {
      this.configs = configs
    })
    this.getConfigs()
  }

  openConfig(config) {
    const modalRef = this.modalService.open(GpuConfigModalComponent, {
      size: 'lg'
    })
    modalRef.componentInstance.config = config
  }

  removeConfig(config) {
    this.service.remove(config).subscribe(() => {})
  }

  getConfigs() {
    this.service.readAll()
  }
}
