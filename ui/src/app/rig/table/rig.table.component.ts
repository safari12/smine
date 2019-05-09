import { Component, Input } from '@angular/core';
import { Rig } from '../rig';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rig-table',
  templateUrl: './rig.table.component.html',
  styleUrls: ['./rig.table.component.css']
})
export class RigTableComponent {
  @Input() rigs$: Observable<Rig[]>;
}
