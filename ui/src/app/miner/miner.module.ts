import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MinerConfigModule } from './config/miner.config.module'
import MinerService from './miner.service'

@NgModule({
  declarations: [],
  imports: [CommonModule, MinerConfigModule],
  providers: [MinerService],
  exports: [MinerConfigModule]
})
export class MinerModule {}
