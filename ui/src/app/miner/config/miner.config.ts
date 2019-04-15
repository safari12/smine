import API from 'src/app/net/api'
import MongoDocument from '../../shared/mongo/mongo.document'

export interface MinerConfig extends MongoDocument {
  name: string
  miner: string
  api: API
}
