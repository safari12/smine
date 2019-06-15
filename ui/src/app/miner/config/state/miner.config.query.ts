import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { MinerConfigStore, MinerConfigState } from './miner.config.store';
import { MinerConfig } from '../miner.config';

@Injectable()
export class MinerConfigQuery extends QueryEntity<
  MinerConfigState,
  MinerConfig
> {
  constructor(protected store: MinerConfigStore) {
    super(store);
  }
}
