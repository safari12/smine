import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoinStore } from './coin.store';
import { tap } from 'rxjs/operators';

@Injectable()
export class CoinService {
  constructor(protected http: HttpClient, protected store: CoinStore) {}

  getSupported() {
    this.http.get<string[]>('/api/coins/supported').subscribe(coins => {
      this.store.update(coins);
    });
  }
}
