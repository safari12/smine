import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Rig } from '../rig';

@Component({
  selector: 'app-rig-table',
  templateUrl: './rig.table.component.html',
  styleUrls: ['./rig.table.component.css']
})
export class RigTableComponent {
  @Input() rigs: Rig[];
  @Output() onEdit = new EventEmitter<Rig>();
  @Output() onDelete = new EventEmitter<Rig>();

  edit(rig: Rig) {
    this.onEdit.emit(rig);
  }

  delete(rig: Rig) {
    this.onDelete.emit(rig);
  }
}
