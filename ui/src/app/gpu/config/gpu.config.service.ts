import { GpuConfig } from './gpu.config'
import { Injectable } from '@angular/core'
import { CRUDService } from '../../shared/crud/crud.service'

@Injectable()
export default class GpuConfigService extends CRUDService<GpuConfig> {
  protected endpoint = '/api/gpu/configs'
}
