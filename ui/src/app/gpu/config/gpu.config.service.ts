import { GpuConfig } from './gpu.config'
import { Observable, of } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable()
export default class GpuConfigService {
  configs: GpuConfig[] = []

  constructor(private http: HttpClient) {}

  add(config: GpuConfig) {
    this.configs.push(config)
  }

  remove(idx) {
    this.configs.splice(idx, 1)
  }

  getAll(): Observable<GpuConfig[]> {
    return this.http.get<GpuConfig[]>('/api/gpu/configs')
  }
}
