import MongoDocument from '../../shared/mongo/mongo.document';
import { Coin } from '../../coin/coin';

export interface MinerConfig extends MongoDocument {
  name: string;
  type: string;
  coin: Coin;
  device: string;
}
