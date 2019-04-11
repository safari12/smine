import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs/operators'
import * as _ from 'lodash'

@Injectable()
export class CRUDService<T> {
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
}
