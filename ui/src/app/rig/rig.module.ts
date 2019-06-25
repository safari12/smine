import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RigTableComponent } from './table/rig.table.component';
import { RigTableHeaderComponent } from './table/header/rig.table.header.component';
import { RigModalComponent } from './modal/rig.modal.component';
import { RigSearchBarComponent } from './searchbar/rig.searchbar';
import { RigComponent } from './rig.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared/shared.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { RigSearchPipe } from './rig.search.pipe';
import { RigService } from './state/rig.service';
import { RigQuery } from './state/rig.query';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const config: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {}
};

@NgModule({
  declarations: [
    RigComponent,
    RigTableComponent,
    RigTableHeaderComponent,
    RigModalComponent,
    RigSearchBarComponent,
    RigSearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule,
    NgbModule,
    SocketIoModule.forRoot(config)
  ],
  entryComponents: [RigModalComponent],
  providers: [RigService, RigQuery],
  exports: [RigComponent, RigTableComponent]
})
export class RigModule {}
