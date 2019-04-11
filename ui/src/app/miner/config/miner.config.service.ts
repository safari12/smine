import { Injectable } from '@angular/core'
import { MinerConfig } from './miner.config'
import { CRUDService } from '../../shared/crud/crud.service'

@Injectable()
export default class MinerConfigService extends CRUDService<MinerConfig> {
  protected endpoint = '/api/miners/configs'
}
