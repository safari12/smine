import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MinerConfigTableHeaderComponent } from './table/header/miner.config.table.header.component'
import { MinerConfigTableComponent } from './table/miner.config.table.component'

@NgModule({
  declarations: [MinerConfigTableHeaderComponent, MinerConfigTableComponent],
  imports: [CommonModule],
  exports: [MinerConfigTableComponent, MinerConfigTableHeaderComponent]
})
export class ConfigModule {}
