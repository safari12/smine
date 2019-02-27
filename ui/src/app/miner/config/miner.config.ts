import API from 'src/app/net/api'

export class MinerConfig {
  name: string
  api: API

  constructor(name: string, api: API) {
    this.name = name
    this.api = api
  }
}
