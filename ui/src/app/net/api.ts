export default class API {
  endpoint: string
  port: number

  constructor(endpoint, port) {
    this.endpoint = endpoint
    this.port = port
  }
}
