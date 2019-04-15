import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs/operators'
import * as _ from 'lodash'
import MongoDocument from '../mongo/mongo.document'

@Injectable()
export class CRUDService<T extends MongoDocument> {
  private modelSubject = new BehaviorSubject<T[]>([])
  public readonly modelSource = this.modelSubject.asObservable()

  protected endpoint: string

  constructor(private http: HttpClient) {}

  public get modelValue() {
    return this.modelSubject.value
  }

  create(model: T): Observable<T> {
    return this.http.post<T>(this.endpoint, model).pipe(
      tap(model => {
        this.modelSubject.next(_.concat(this.modelValue, model))
      })
    )
  }

  readAll(): void {
    this.http.get<T[]>(this.endpoint).subscribe(model => {
      this.modelSubject.next(model)
    })
  }

  remove(model: T) {
    return this.http.delete<T>(`${this.endpoint}/${model._id}`).pipe(
      tap(model => {
        _.remove(this.modelValue, (n: T) => {
          return n._id === model._id
        })
        this.modelSubject.next(this.modelValue)
      })
    )
  }

  update(model: T) {
    return this.http.put<T>(`${this.endpoint}/${model._id}`, model).pipe(
      tap(() => {
        const idx = _.findIndex(this.modelValue, (n: T) => {
          return n._id === model._id
        })
        this.modelValue[idx] = model
        this.modelSubject.next(this.modelValue)
      })
    )
  }
}
