import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CRUDService } from './crud/crud.service';
import { YesOrNoPipe } from './pipes/yesorno.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [YesOrNoPipe],
  providers: [CRUDService],
  exports: [YesOrNoPipe]
})
export class SharedModule {}
