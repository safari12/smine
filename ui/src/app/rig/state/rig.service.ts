import { EntityService } from 'src/app/shared/entity/entity.service';
import { RigState, RigStore } from './rig.store';
import { Rig } from '../rig';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Injectable } from '@angular/core';

@Injectable()
export class RigService extends EntityService<RigState, Rig> {
  protected endpoint = '/api/rigs';

  constructor(
    protected http: HttpClient,
    protected store: RigStore,
    protected socket: Socket
  ) {
    super(http, store);
    this.listen();
  }

  private listen() {
    this.socket.fromEvent<Rig[]>('rigs-synced').subscribe(rigs => {
      this.store.upsertMany(rigs);
    });
  }
}
