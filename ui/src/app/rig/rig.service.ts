import { Injectable } from '@angular/core';
import { CRUDService } from '../shared/crud/crud.service';
import { Rig } from './rig';

@Injectable()
export default class RigService extends CRUDService<Rig> {
  protected endpoint = '/api/rigs';
}
