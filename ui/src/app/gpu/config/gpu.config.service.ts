import { GpuConfig } from './gpu.config'
import { Observable, of, BehaviorSubject, timer } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs/operators'
import * as _ from 'lodash'

@Injectable()
export default class GpuConfigService {
  private configsSubject = new BehaviorSubject<GpuConfig[]>([])
  public readonly configsSource = this.configsSubject.asObservable()

  constructor(private http: HttpClient) {}

  public get configsValue() {
    return this.configsSubject.value
  }

  add(config: GpuConfig): Observable<GpuConfig> {
    return this.http.post<GpuConfig>('/api/gpu/configs', config).pipe(
      tap(config => {
        this.configsSubject.next(_.concat(this.configsValue, config))
      })
    )
  }

  remove(config: GpuConfig) {
    return this.http.delete<GpuConfig>(`/api/gpu/configs/${config._id}`).pipe(
      tap(config => {
        _.remove(this.configsValue, { _id: config._id })
        this.configsSubject.next(this.configsValue)
      })
    )
  }

  getAll() {
    this.http.get<GpuConfig[]>('/api/gpu/configs').subscribe(configs => {
      this.configsSubject.next(configs)
    })
  }
}
