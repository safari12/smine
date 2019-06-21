import { Injectable } from '@angular/core';
import { Store, StoreConfig, EntityState, EntityStore } from '@datorama/akita';
import { Coin } from '../coin';

export interface CoinState extends EntityState<Coin> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'coins', idKey: 'name' })
export class CoinStore extends EntityStore<CoinState, Coin> {
  constructor() {
    super();
  }
}
