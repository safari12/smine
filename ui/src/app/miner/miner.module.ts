import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MinerConfigModule } from './config/miner.config.module'

@NgModule({
  declarations: [],
  imports: [CommonModule, MinerConfigModule],
  exports: [MinerConfigModule]
})
export class MinerModule {}
