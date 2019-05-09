import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Rig } from './rig';
import RigService from './rig.service';

@Component({
  selector: 'app-rigs',
  styleUrls: ['./rig.component.css'],
  templateUrl: './rig.component.html'
})
export class RigComponent implements OnInit {
  rigs$: Observable<Rig[]>;

  constructor(private service: RigService) {
    this.rigs$ = service.modelSource;
  }

  ngOnInit() {
    this.getRigs();
  }

  getRigs() {
    this.service.readAll();
  }
}
