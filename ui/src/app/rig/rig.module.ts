import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RigTableComponent } from './table/rig.table.component'
import { RigTableHeaderComponent } from './table/header/rig.table.header.component'

@NgModule({
  declarations: [RigTableComponent, RigTableHeaderComponent],
  imports: [CommonModule],
  exports: [RigTableComponent]
})
export class RigModule {}
