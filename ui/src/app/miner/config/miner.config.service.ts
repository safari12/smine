import { Injectable } from '@angular/core'
import { MinerConfig } from './miner.config'
import { CrudService } from 'ngx-crud'

@Injectable()
export default class MinerConfigService extends CrudService<MinerConfig> {
  protected endpoint = '/api/miners/configs'
}
