import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import * as _ from 'lodash';
import MongoDocument from '../mongo/mongo.document';

@Injectable()
export class CRUDService<T extends MongoDocument> {
  protected readonly _items = new BehaviorSubject<T[]>([]);
  readonly items$ = this._items.asObservable();

  protected endpoint: string;

  constructor(protected http: HttpClient) {}

  public get items() {
    return this._items.value;
  }

  create(model: T): Observable<T> {
    return this.http.post<T>(this.endpoint, model).pipe(
      tap(model => {
        this._items.next(_.concat(this.items, model));
      })
    );
  }

  readAll(): void {
    this.http.get<T[]>(this.endpoint).subscribe(model => {
      this._items.next(model);
    });
  }

  remove(model: T) {
    return this.http.delete<T>(`${this.endpoint}/${model._id}`).pipe(
      tap(model => {
        _.remove(this.items, (n: T) => {
          return n._id === model._id;
        });
        this._items.next(this.items);
      })
    );
  }

  update(model: T) {
    return this.http.put<T>(`${this.endpoint}/${model._id}`, model).pipe(
      tap(() => {
        const idx = _.findIndex(this.items, (n: T) => {
          return n._id === model._id;
        });
        this.items[idx] = model;
        this._items.next(this.items);
      })
    );
  }
}
