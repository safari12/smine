import { GpuConfig } from './gpu.config'
import { Observable, of } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable()
export default class GpuConfigService {
  configs: GpuConfig[] = []

  add(config: GpuConfig) {
    this.configs.push(config)
  }

  remove(idx) {
    this.configs.splice(idx, 1)
  }

  getAll(): Observable<GpuConfig[]> {
    return of(this.configs)
  }
}
