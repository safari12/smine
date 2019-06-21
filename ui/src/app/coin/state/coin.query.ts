import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { CoinStore, CoinState } from './coin.store';
import { Coin } from '../coin';

@Injectable()
export class CoinQuery extends QueryEntity<CoinState, Coin> {
  constructor(protected store: CoinStore) {
    super(store);
  }
}
