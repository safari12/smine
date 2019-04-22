import Miner from '../miner/miner'
import GPU from '../gpu/gpu'

export default interface Rig {
  hostname: String
  miners: Miner[]
  gpu: GPU
}
