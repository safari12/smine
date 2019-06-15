import { Injectable } from '@angular/core';
import { GpuConfig } from '../gpu.config';
import { EntityService } from '../../../shared/entity/entity.service';
import { GpuConfigState, GpuConfigStore } from './gpu.config.store';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GpuConfigService extends EntityService<GpuConfigState, GpuConfig> {
  protected endpoint = '/api/gpu/configs';

  constructor(protected http: HttpClient, protected store: GpuConfigStore) {
    super(http, store);
  }
}
