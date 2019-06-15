import { EntityState, StoreConfig, EntityStore } from '@datorama/akita';
import { GpuConfig } from '../gpu.config';
import { Injectable } from '@angular/core';

export interface GpuConfigState extends EntityState<GpuConfig> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'gpuConfigs', idKey: '_id' })
export class GpuConfigStore extends EntityStore<GpuConfigState, GpuConfig> {
  constructor() {
    super();
  }
}
