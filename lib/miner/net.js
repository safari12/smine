const request = require('request-promise')
const _ = require('lodash')

const Miner = require('./model')

class MinerNet {
  constructor(config) {
    this.config = config
    this.stats = {
      offline: [],
      online: []
    }
  }

  syncStats() {
    const discovery = this.config.discovery
    const hostname = discovery.hostname
    const api = discovery.api

    let multiRequest = []

    for (let i = 1; i < discovery.number_of_miners; i++) {
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

    return Promise.all(multiRequest)
      .then((newOnlineMiners) => {
        const filteredNewOnlineMiners = _.filter(newOnlineMiners, (m) => m !== null)
        const offlineMinbers = _.differenceBy(this.stats.online, filteredNewOnlineMiners, 'name')

        this.stats = {
          offline: offlineMinbers,
          online: filteredNewOnlineMiners
        }

        return this.stats
      })
  }

  getStats() {
    return this.stats
  }
}

module.exports = MinerNet