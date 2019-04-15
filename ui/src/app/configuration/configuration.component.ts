import { Component, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { MinerConfigModalComponent } from '../miner/config/modal/miner.config.modal.component'
import { MinerConfig } from '../miner/config/miner.config'
import MinerConfigService from '../miner/config/miner.config.service'
import MinerService from '../miner/miner.service'
import { delay } from 'rxjs/operators'

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  minerConfigs: MinerConfig[]
  miners: string[]

  constructor(
    private modalService: NgbModal,
    private minerService: MinerService,
    private minerConfigService: MinerConfigService
  ) {}

  ngOnInit() {
    this.minerConfigService.modelSource.subscribe(minerConfigs => {
      this.minerConfigs = minerConfigs
    })
    this.minerService.getSupported().subscribe(miners => {
      this.miners = miners
    })
    this.minerConfigService.readAll()
  }

  openMinerModal() {
    const modal = this.modalService.open(MinerConfigModalComponent, {
      size: 'lg',
      centered: true
    })
    modal.componentInstance.miners = this.miners

    return modal
  }

  createMinerConfig() {
    const modal = this.openMinerModal()
    modal.componentInstance.onCreate.subscribe(config => {
      modal.componentInstance.loading = true
      this.minerConfigService
        .create(config)
        .pipe(delay(1000))
        .subscribe(() => {
          modal.componentInstance.loading = false
          modal.close()
        })
    })
  }

  editMinerConfig(config) {
    const modal = this.openMinerModal()
    modal.componentInstance.config = config
    modal.componentInstance.onUpdate.subscribe(config => {
      modal.componentInstance.loading = true
      this.minerConfigService
        .update(config)
        .pipe(delay(1000))
        .subscribe(() => {
          modal.componentInstance.loading = false
          modal.close()
        })
    })
  }

  deleteMinerConfig(config) {
    this.minerConfigService.remove(config)
  }
}
