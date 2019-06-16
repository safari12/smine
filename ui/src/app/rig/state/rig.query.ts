import { QueryEntity } from '@datorama/akita';
import { RigState, RigStore } from './rig.store';
import { Rig } from '../rig';
import { Injectable } from '@angular/core';

@Injectable()
export class RigQuery extends QueryEntity<RigState, Rig> {
  constructor(protected store: RigStore) {
    super(store);
  }
}
