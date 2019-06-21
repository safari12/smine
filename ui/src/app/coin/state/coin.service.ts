import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoinStore } from './coin.store';
import { Coin } from '../coin';

@Injectable()
export class CoinService {
  constructor(protected http: HttpClient, protected store: CoinStore) {}

  getSupported() {
    this.http.get<Coin[]>('/api/coins/supported').subscribe(coins => {
      this.store.set(coins);
    });
  }
}
