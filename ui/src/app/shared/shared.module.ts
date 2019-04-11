import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CRUDService } from './crud/crud.service'

@NgModule({
  imports: [CommonModule],
  providers: [CRUDService]
})
export class SharedModule {}
