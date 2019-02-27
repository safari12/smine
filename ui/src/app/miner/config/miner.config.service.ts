import { Observable, of } from 'rxjs'
import { Injectable } from '@angular/core'
import { MinerConfig } from './miner.config'

@Injectable()
export default class MinerConfigService {
  configs: MinerConfig[] = []

  add(config: MinerConfig) {
    this.configs.push(config)
  }

  remove(idx) {
    this.configs.splice(idx, 1)
  }

  getAll(): Observable<MinerConfig[]> {
    return of(this.configs)
  }
}
