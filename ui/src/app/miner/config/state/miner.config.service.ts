import { EntityService } from 'src/app/shared/entity/entity.service';
import { MinerConfigState, MinerConfigStore } from './miner.config.store';
import { MinerConfig } from '../miner.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MinerConfigService extends EntityService<
  MinerConfigState,
  MinerConfig
> {
  protected endpoint = '/api/miners/configs';

  constructor(protected http: HttpClient, protected store: MinerConfigStore) {
    super(http, store);
  }
}
