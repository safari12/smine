import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  rigs = []

  constructor() {}

  ngOnInit() {
    this.getRigs()
  }

  getRigs() {
    for (let i = 10; i < 40; i++) {
      this.rigs.push({
        hostname: `s-m-${i}`,
        pingable: i % 2 == 0 ? true : false,
        miner: {
          name: 'xmr-stak',
          hashrate: 25,
          config: '1234'
        },
        gpu: {
          cards: [],
          wattage: 430,
          config: '1234'
        }
      })
    }
  }
}
