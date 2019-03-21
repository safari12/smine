import { Component, OnInit } from '@angular/core'
import MinerConfigService from '../miner.config.service'

@Component({
  selector: 'app-miner-config-table',
  templateUrl: './miner.config.table.component.html',
  styleUrls: ['./miner.config.table.component.css']
})
export class MinerConfigTableComponent implements OnInit {
  configs = []

  constructor(private service: MinerConfigService) {}

  ngOnInit() {
    this.service.find().subscribe(configs => {
      console.log('configs: ', configs)
      this.configs = configs
    })
  }
}
