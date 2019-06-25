import { GpuConfig } from './config/gpu.config';

export default interface GPU {
  cards?: any[];
  totalWattage?: number;
  config: GpuConfig;
  error?: string;
}
