import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import MinerConfigService from '../miner.config.service'
import { MinerConfig } from '../miner.config'

@Component({
  selector: 'app-miner-config-table',
  templateUrl: './miner.config.table.component.html',
  styleUrls: ['./miner.config.table.component.css']
})
export class MinerConfigTableComponent {
  @Input() configs: MinerConfig[]
  @Output() onEdit = new EventEmitter<MinerConfig>()
  @Output() onDelete = new EventEmitter<MinerConfig>()

  edit(config: MinerConfig) {
    this.onEdit.emit(config)
  }

  delete(config: MinerConfig) {
    this.onDelete.emit(config)
  }
}
