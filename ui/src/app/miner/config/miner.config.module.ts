import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MinerConfigTableHeaderComponent } from './table/header/miner.config.table.header.component'
import { MinerConfigTableComponent } from './table/miner.config.table.component'
import MinerConfigService from './miner.config.service'
import { MinerConfigModalComponent } from './modal/miner.config.modal.component'
import { ReactiveFormsModule } from '@angular/forms'
import { MinerConfigComponent } from './miner.config.component'

@NgModule({
  declarations: [
    MinerConfigTableHeaderComponent,
    MinerConfigTableComponent,
    MinerConfigModalComponent,
    MinerConfigComponent
  ],
  imports: [CommonModule, ReactiveFormsModule],
  entryComponents: [MinerConfigModalComponent],
  providers: [MinerConfigService],
  exports: [
    MinerConfigTableComponent,
    MinerConfigTableHeaderComponent,
    MinerConfigComponent
  ]
})
export class MinerConfigModule {}
