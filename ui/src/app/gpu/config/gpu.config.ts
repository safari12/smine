import API from 'src/app/net/api'

class Card {
  count: number

  constructor(count) {
    this.count = count
  }
}

class Power {
  limit: number

  constructor(limit) {
    this.limit = limit
  }
}

export class GpuConfig {
  name: string
  api: API
  card: Card
  power: Power

  constructor(name: string, api: API, card: Card, power: Power) {
    this.name = name
    this.api = api
    this.card = card
    this.power = power
  }
}
