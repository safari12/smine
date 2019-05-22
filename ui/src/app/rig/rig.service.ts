import { Injectable } from '@angular/core';
import { CRUDService } from '../shared/crud/crud.service';
import { Rig } from './rig';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';

@Injectable()
export default class RigService extends CRUDService<Rig> {
  protected endpoint = '/api/rigs';

  constructor(protected http: HttpClient, protected socket: Socket) {
    super(http);
    this.listen();
  }

  private listen() {
    this.socket.fromEvent<Rig[]>('rigs-synced').subscribe(rigs => {
      if (rigs.length === this.items.length) {
        this._items.next(rigs);
      }
    });
  }
}
