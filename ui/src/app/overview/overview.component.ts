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
    return _.reduce(
      this.rigs,
      (total, r) => {
        return (
          total +
          _.reduce(
            r.gpu.cards,
            (acc, c) => {
              return acc + c.wattage;
            },
            0
          )
        );
      },
      0
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
