import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

@Injectable()
@StoreConfig({ name: 'coins', idKey: '' })
export class CoinStore extends Store<string[]> {
  constructor() {
    super([]);
  }
}
