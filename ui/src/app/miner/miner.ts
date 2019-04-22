import { MinerConfig } from './config/miner.config'

export default interface Miner {
  hashrate?: number
  config: MinerConfig
}
