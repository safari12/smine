import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Rig } from '../rig';

@Component({
  selector: 'app-rig-table',
  templateUrl: './rig.table.component.html',
  styleUrls: ['./rig.table.component.css']
})
export class RigTableComponent {
  @Input() rigs: Rig[];
  @Output() onDelete = new EventEmitter();

  delete(rig: Rig) {
    this.onDelete.emit(rig);
  }
}
