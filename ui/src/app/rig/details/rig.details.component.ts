import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'rig-details',
  templateUrl: './rig.details.component.html',
  styleUrls: ['./rig.details.component.css']
})
export class RigDetailsComponent {
  constructor(private location: Location) {}

  back() {
    this.location.back();
  }
}
