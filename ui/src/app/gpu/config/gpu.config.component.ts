import { Component, OnInit } from '@angular/core'
import { GpuConfig } from './gpu.config'
import GpuConfigService from './gpu.config.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { GpuConfigModalComponent } from './modal/gpu.config.modal.component'
import { delay } from 'rxjs/operators'

@Component({
  selector: 'app-gpu-configs',
  templateUrl: './gpu.config.component.html',
  styleUrls: ['./gpu.config.component.css']
})
export class GpuConfigComponent implements OnInit {
  configs: GpuConfig[]

  constructor(
    private modalService: NgbModal,
    private service: GpuConfigService
  ) {}

  ngOnInit() {
    this.service.modelSource.subscribe(configs => {
      this.configs = configs
    })
    this.service.readAll()
  }

  openModal() {
    return this.modalService.open(GpuConfigModalComponent, {
      size: 'lg',
      centered: true
    })
  }

  create() {
    const modal = this.openModal()
    modal.componentInstance.onCreate.subscribe(config => {
      modal.componentInstance.loading = true
      this.service
        .create(config)
        .pipe(delay(500))
        .subscribe(() => {
          modal.componentInstance.loading = false
          modal.close()
        })
    })
  }

  edit(config: GpuConfig) {
    const modal = this.openModal()
    modal.componentInstance.config = config
    modal.componentInstance.onUpdate.subscribe(config => {
      modal.componentInstance.loading = true
      this.service
        .update(config)
        .pipe(delay(500))
        .subscribe(() => {
          modal.componentInstance.loading = false
          modal.close()
        })
    })
  }

  delete(config: GpuConfig) {
    this.service.remove(config).subscribe()
  }
}
