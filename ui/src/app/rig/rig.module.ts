import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RigTableComponent } from './table/rig.table.component'
import { RigTableHeaderComponent } from './table/header/rig.table.header.component'
import { RigModalComponent } from './modal/rig.modal.component'

@NgModule({
  declarations: [RigTableComponent, RigTableHeaderComponent, RigModalComponent],
  imports: [CommonModule],
  entryComponents: [RigModalComponent],
  exports: [RigTableComponent]
})
export class RigModule {}
