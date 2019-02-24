import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-gpu-config-table',
  templateUrl: './gpu.config.table.component.html',
  styleUrls: ['./gpu.config.table.component.css']
})
export class GpuConfigTableComponent implements OnInit {
  configs = []

  constructor() {}

  ngOnInit() {
    this.getConfigs()
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
