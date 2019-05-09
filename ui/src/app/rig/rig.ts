import Miner from '../miner/miner';
import GPU from '../gpu/gpu';
import MongoDocument from '../shared/mongo/mongo.document';

export interface Rig extends MongoDocument {
  hostname: String;
  miners: Miner[];
  gpu: GPU;
}
