import { EntityState, StoreConfig, EntityStore } from '@datorama/akita';
import { MinerConfig } from '../miner.config';
import { Injectable } from '@angular/core';

export interface MinerConfigState extends EntityState<MinerConfig> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'minerConfigs', idKey: '_id' })
export class MinerConfigStore extends EntityStore<
  MinerConfigState,
  MinerConfig
> {
  constructor() {
    super({ loading: false });
  }
}
