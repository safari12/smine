import { QueryEntity } from '@datorama/akita';
import { GpuConfigState, GpuConfigStore } from './gpu.config.store';
import { GpuConfig } from '../gpu.config';
import { Injectable } from '@angular/core';

@Injectable()
export class GpuConfigQuery extends QueryEntity<GpuConfigState, GpuConfig> {
  constructor(protected store: GpuConfigStore) {
    super(store);
  }
}
