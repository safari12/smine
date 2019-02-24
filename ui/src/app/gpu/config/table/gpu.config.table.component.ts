import { Component, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { GpuConfigModalComponent } from '../modal/gpu.config.modal.component'

@Component({
  selector: 'app-gpu-config-table',
  templateUrl: './gpu.config.table.component.html',
  styleUrls: ['./gpu.config.table.component.css']
})
export class GpuConfigTableComponent implements OnInit {
  configs = []
  selectedConfig: any = null

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    this.getConfigs()
  }

  openConfig(config) {
    const modalRef = this.modalService.open(GpuConfigModalComponent, {
      size: 'lg'
    })
    modalRef.componentInstance.config = config
  }

  getConfigs() {
    for (let i = 0; i < 2; i++) {
      this.configs.push({
        name: '6 Half Power GPU',
        api: {
          endpoint: '/gpu',
          port: 6969
        },
        card: {
          count: 6
        },
        power: {
          limit: 90
        }
      })
    }
  }
}
