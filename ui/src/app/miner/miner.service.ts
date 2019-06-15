import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MinerService {
  constructor(private http: HttpClient) {}

  getSupported(): Observable<string[]> {
    return this.http.get<string[]>('/api/miners/supported');
  }
}
