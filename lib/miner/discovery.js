const request = require('request-promise')
const _ = require('lodash')

const Miner = require('./model')

class MinerDiscovery {
  constructor(numberOfMiners, hostname, api) {
    this.numberOfMiners = numberOfMiners
    this.hostname = hostname
    this.api = api
    this.stats = {
      offline: [],
      online: []
    }
  }

  async getStats() {
    let onlineMiners = await Promise.all(this.fetchOnlineMiners())
    onlineMiners = _.filter(onlineMiners, (m) => m !== null)

    const offlineMinbers = _.differenceBy(this.stats.online, onlineMiners, 'name')

    this.stats = {
      offline: offlineMinbers,
      online: onlineMiners
    }

    return this.stats
  }

  fetchOnlineMiners() {
    let multiRequest = []

    for (let i = 1; i <= this.numberOfMiners; i++) {
      const name = this.hostname.prefix + Miner.getId(i)
      const uri = `http://${name}:${this.api.port}${this.api.endpoint}`

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
}

module.exports = MinerDiscovery
