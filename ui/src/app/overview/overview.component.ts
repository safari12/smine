import { Component, OnInit } from '@angular/core';
import RigService from '../rig/rig.service';
import * as _ from 'lodash';

import humanFormat from 'human-format';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  constructor(private rigService: RigService) {}

  ngOnInit() {}

  get rigs() {
    return this.rigService.items;
  }

  get gpuTotalWattage() {
    return humanFormat(
      _.reduce(
        this.rigs,
        (total, r) => {
          return total + r.gpu.totalWattage;
        },
        0
      )
    );
  }

  get totalHashrate() {
    return humanFormat(
      _.reduce(
        this.rigs,
        (acc, r) => {
          return acc + r.hashrate;
        },
        0
      )
    );
  }
}
