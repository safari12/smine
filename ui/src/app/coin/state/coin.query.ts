import { Query } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { CoinStore } from './coin.store';

@Injectable()
export class CoinQuery extends Query<string[]> {
  constructor(protected store: CoinStore) {
    super(store);
  }
}
