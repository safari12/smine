import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import humanFormat from 'human-format';
import { RigQuery } from '../rig/state/rig.query';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  numberOfRigs: number;
  gpuTotalWattage: number;
  totalHashrate: number;

  constructor(private rigQuery: RigQuery) {}

  ngOnInit() {
    this.rigQuery.selectAll().subscribe(rigs => {
      this.numberOfRigs = rigs.length;
      this.setGpuTotalWattage(rigs);
      this.setTotalHashrate(rigs);
    });
  }

  private setGpuTotalWattage(rigs) {
    this.gpuTotalWattage = humanFormat(
      _.reduce(
        rigs,
        (total, r) => {
          return total + r.gpu.totalWattage;
        },
        0
      )
    );
  }

  private setTotalHashrate(rigs) {
    this.totalHashrate = humanFormat(
      _.reduce(
        rigs,
        (acc, r) => {
          return acc + r.hashrate;
        },
        0
      )
    );
  }
}
