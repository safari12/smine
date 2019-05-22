import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CRUDService } from './crud/crud.service';
import { YesOrNoPipe } from './pipes/yesorno.pipe';
import { ConfirmModalComponent } from './confirm/confirm.modal.component';

@NgModule({
  imports: [CommonModule],
  declarations: [YesOrNoPipe, ConfirmModalComponent],
  entryComponents: [ConfirmModalComponent],
  providers: [CRUDService],
  exports: [YesOrNoPipe, ConfirmModalComponent]
})
export class SharedModule {}
