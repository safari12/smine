import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-miner-config-table',
  templateUrl: './miner.config.table.component.html',
  styleUrls: ['./miner.config.table.component.css']
})
export class MinerConfigTableComponent implements OnInit {
  configs = []

  constructor() {}

  ngOnInit() {
    this.getConfigs()
  }

  getConfigs() {
    for (let i = 0; i < 2; i++) {
      this.configs.push({
        name: 'XMR-STAK 6 GPU',
        miner: 'xmr-stak',
        api: {
          endpoint: '/api.json',
          port: 6969
        }
      })
    }
  }
}
