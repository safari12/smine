import { Observable, of, BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'
import { MinerConfig } from './miner.config'
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs/operators'
import * as _ from 'lodash'

@Injectable()
export default class MinerConfigService {
  private configsSubject = new BehaviorSubject<MinerConfig[]>([])
  public readonly configsSource = this.configsSubject.asObservable()

  constructor(private http: HttpClient) {}

  get configsValue() {
    return this.configsSubject.value
  }

  configs: MinerConfig[] = []

  add(config: MinerConfig) {
    return this.http.post<MinerConfig>('/api/miner/configs', config).pipe(
      tap(config => {
        this.configsSubject.next(_.concat(this.configsValue, config))
      })
    )
  }

  remove(idx) {
    this.configs.splice(idx, 1)
  }

  getAll(): Observable<MinerConfig[]> {
    return of(this.configs)
  }
}
