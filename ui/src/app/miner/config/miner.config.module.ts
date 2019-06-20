import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinerConfigTableHeaderComponent } from './table/header/miner.config.table.header.component';
import { MinerConfigTableComponent } from './table/miner.config.table.component';
import { MinerConfigModalComponent } from './modal/miner.config.modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MinerConfigComponent } from './miner.config.component';
import { MinerConfigService } from './state/miner.config.service';
import { MinerConfigQuery } from './state/miner.config.query';
import { CoinModule } from 'src/app/coin/coin.module';

@NgModule({
  declarations: [
    MinerConfigTableHeaderComponent,
    MinerConfigTableComponent,
    MinerConfigModalComponent,
    MinerConfigComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, CoinModule],
  entryComponents: [MinerConfigModalComponent],
  providers: [MinerConfigService, MinerConfigQuery],
  exports: [
    MinerConfigTableComponent,
    MinerConfigTableHeaderComponent,
    MinerConfigComponent
  ]
})
export class MinerConfigModule {}
