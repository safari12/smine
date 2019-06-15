import MongoDocument from '../mongo/mongo.document';
import { HttpClient } from '@angular/common/http';
import { EntityStore, EntityState } from '@datorama/akita';
import { tap } from 'rxjs/operators';

export abstract class EntityService<
  S extends EntityState,
  T extends MongoDocument
> {
  protected endpoint: string;

  constructor(protected http: HttpClient, protected store: EntityStore<S, T>) {}

  readAll() {
    this.http.get<T[]>(this.endpoint).subscribe(entities => {
      this.store.set(entities);
    });
  }

  create(entity: T) {
    this.store.setLoading(true);
    return this.http.post<T>(this.endpoint, entity).pipe(
      tap(entity => {
        this.store.setLoading(false);
        this.store.add(entity);
      })
    );
  }

  update(entity: T) {
    this.store.setLoading(true);
    return this.http.put<T>(`${this.endpoint}/${entity._id}`, entity).pipe(
      tap(entity => {
        this.store.setLoading(false);
        this.store.update(entity._id, entity);
      })
    );
  }

  delete(entity: T) {
    this.store.setLoading(true);
    return this.http.delete<T>(`${this.endpoint}/${entity._id}`).pipe(
      tap(entity => {
        this.store.setLoading(false);
        this.store.remove(entity._id);
      })
    );
  }
}
