import { GpuConfig } from './gpu.config'
import { Observable, of, BehaviorSubject, timer } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs/operators'

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
        this.configsValue.push(config)
        this.configsSubject.next(this.configsValue)
      })
    )
  }

  remove(idx) {
    // this.configs.splice(idx, 1)
  }

  getAll() {
    this.http.get<GpuConfig[]>('/api/gpu/configs').subscribe(configs => {
      this.configsSubject.next(configs)
    })
  }
}
