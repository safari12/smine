import { EntityState, StoreConfig, EntityStore } from '@datorama/akita';
import { Rig } from '../rig';
import { Injectable } from '@angular/core';

export class RigState implements EntityState<Rig> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'rig', idKey: '_id' })
export class RigStore extends EntityStore<RigState, Rig> {
  constructor() {
    super({ loading: false });
  }
}
