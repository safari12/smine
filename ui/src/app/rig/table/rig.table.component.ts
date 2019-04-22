import { Component, Input } from '@angular/core'
import Rig from '../rig'

@Component({
  selector: 'app-rig-table',
  templateUrl: './rig.table.component.html',
  styleUrls: ['./rig.table.component.css']
})
export class RigTableComponent {
  @Input() rigs: Rig[]
}
