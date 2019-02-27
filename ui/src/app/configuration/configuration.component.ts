import { Component, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { GpuConfigModalComponent } from '../gpu/config/modal/gpu.config.modal.component'
import { MinerConfigModalComponent } from '../miner/config/modal/miner.config.modal.component'

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  addGPUConfig() {
    this.modalService.open(GpuConfigModalComponent, {
      size: 'lg'
    })
  }

  addMinerConfig() {
    this.modalService.open(MinerConfigModalComponent, {
      size: 'lg'
    })
  }
}
