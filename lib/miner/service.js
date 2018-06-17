const request = require('request-promise')
const _ = require('lodash')

const Miner = require('./model')

class MinerService {
  constructor(discovery) {
    this.discovery = discovery
    this.stats = {
      offline: [],
      online: []
    }
  }

  async syncStats() {
    const numberOfMiners = this.discovery.number_of_miners
    const hostname = this.discovery.hostname
    const api = this.discovery.api

    let newOnlineMiners = await Promise.all(this.fetchMultipleMiners(numberOfMiners, hostname, api))
    newOnlineMiners = _.filter(newOnlineMiners, (m) => m !== null)

    const offlineMinbers = _.differenceBy(this.stats.online, newOnlineMiners, 'name')

    this.stats = {
      offline: offlineMinbers,
      online: newOnlineMiners
    }

    return this.stats
  }

  fetchMultipleMiners(numberOfMiners, hostname, api) {
    let multiRequest = []

    for (let i = 1; i <= numberOfMiners; i++) {
      const name = hostname.prefix + Miner.getId(i)
      const uri = `http://${name}:${api.port}${api.endpoint}`

      multiRequest.push(
        request({
          uri: uri,
          json: true,
          timeout: 500
        })
          .then((body) => {
            return new Miner({
              name: name,
              software: 'xmr-stak',
              data: body,
            })
          })
          .catch(() => {
            return null
          })
      )
    }

    return multiRequest
  } 

  getStats() {
    return this.stats
  }
}

module.exports = MinerService