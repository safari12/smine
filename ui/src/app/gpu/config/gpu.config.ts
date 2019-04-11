import MongoDocument from '../../shared/mongo/mongo.document'

interface Power {
  limit: number
}

export interface GpuConfig extends MongoDocument {
  name: string
  power: Power
}
