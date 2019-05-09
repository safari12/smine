import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RigTableComponent } from './table/rig.table.component';
import { RigTableHeaderComponent } from './table/header/rig.table.header.component';
import { RigModalComponent } from './modal/rig.modal.component';
import { RigSearchBarComponent } from './searchbar/rig.searchbar';
import { RigComponent } from './rig.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import RigService from './rig.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RigComponent,
    RigTableComponent,
    RigTableHeaderComponent,
    RigModalComponent,
    RigSearchBarComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, SharedModule],
  entryComponents: [RigModalComponent],
  providers: [RigService],
  exports: [RigComponent, RigTableComponent]
})
export class RigModule {}
