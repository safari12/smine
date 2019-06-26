import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as _ from 'lodash/fp';

@Component({
  selector: 'rig-details',
  templateUrl: './rig.details.component.html',
  styleUrls: ['./rig.details.component.css']
})
export class RigDetailsComponent implements OnInit {
  gpuCards = [];

  constructor(private location: Location) {}

  ngOnInit() {
    this.gpuCards = _.map(
      i => ({
        index: i,
        name: 'GeForce GTX 1070 ti',
        temperature: 77,
        fanSpeed: 23,
        volatile: 50,
        power: {
          usage: 10,
          cap: 120
        },
        memory: {
          usage: 1000,
          cap: 8000
        }
      }),
      _.range(0, 6)
    );

    console.log(this.gpuCards);
  }

  back() {
    this.location.back();
  }
}
