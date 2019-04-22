import { GpuConfig } from './config/gpu.config'

export default interface GPU {
  cards?: any[]
  config: GpuConfig
}
