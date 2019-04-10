class Power {
  limit: number

  constructor(limit) {
    this.limit = limit
  }
}

export class GpuConfig {
  _id?: string
  name: string
  power: Power

  constructor(name: string, power: Power) {
    this.name = name
    this.power = power
  }
}
