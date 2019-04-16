import { Component } from '@angular/core'
import { MinerConfig } from './miner.config'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import MinerService from '../miner.service'
import MinerConfigService from './miner.config.service'
import { MinerConfigModalComponent } from './modal/miner.config.modal.component'
import { delay } from 'rxjs/operators'

@Component({
  selector: 'app-miner-configs',
  templateUrl: './miner.config.component.html',
  styleUrls: ['./miner.config.component.css']
})
export class MinerConfigComponent {
  configs: MinerConfig[]
  miners: string[]

  constructor(
    private modalService: NgbModal,
    private minerService: MinerService,
    private minerConfigService: MinerConfigService
  ) {}

  ngOnInit() {
    this.minerConfigService.modelSource.subscribe(minerConfigs => {
      this.configs = minerConfigs
    })
    this.minerService.getSupported().subscribe(miners => {
      this.miners = miners
    })
    this.minerConfigService.readAll()
  }

  openModal() {
    const modal = this.modalService.open(MinerConfigModalComponent, {
      size: 'lg',
      centered: true
    })
    modal.componentInstance.miners = this.miners

    return modal
  }

  create() {
    const modal = this.openModal()
    modal.componentInstance.onCreate.subscribe(config => {
      modal.componentInstance.loading = true
      this.minerConfigService
        .create(config)
        .pipe(delay(500))
        .subscribe(() => {
          modal.componentInstance.loading = false
          modal.close()
        })
    })
  }

  edit(config) {
    const modal = this.openModal()
    modal.componentInstance.config = config
    modal.componentInstance.onUpdate.subscribe(config => {
      modal.componentInstance.loading = true
      this.minerConfigService
        .update(config)
        .pipe(delay(500))
        .subscribe(() => {
          modal.componentInstance.loading = false
          modal.close()
        })
    })
  }

  delete(config) {
    this.minerConfigService.remove(config)
  }
}
