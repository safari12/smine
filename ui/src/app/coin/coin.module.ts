import { NgModule } from '@angular/core';
import { CoinService } from './state/coin.service';
import { CoinQuery } from './state/coin.query';
import { CommonModule } from '@angular/common';
import { CoinStore } from './state/coin.store';

@NgModule({
  imports: [CommonModule],
  providers: [CoinStore, CoinService, CoinQuery]
})
export class CoinModule {}
