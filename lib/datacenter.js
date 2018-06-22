const request = require('request-promise')
const _ = require('lodash')

const Rig = require('./rig')

class Datacenter {
  constructor(options) {
    this.numberOfRigs = options.number_of_rigs
    this.hostname = options.hostname
    this.api = options.api
    this.stats = {
      offlineRigs: [],
      onlineRigs: [],
    }
    this.lastSeenRigs = []
  }

  async getStats() {
    const rigs = await Promise.all(this.fetchRigs())
    const onlineRigs = _.filter(rigs, (r) => r !== null)

    this.lastSeenRigs = _.concat(
      this.lastSeenRigs,
      _.differenceBy(onlineRigs, this.lastSeenRigs, 'name')
    )
    
    const offlineRigs = _.differenceBy(this.lastSeenRigs, onlineRigs, 'name')

    this.stats = {
      onlineRigs: onlineRigs,
      offlineRigs: offlineRigs
    }

    return this.stats
  }

  fetchRigs() {
    let multiRequest = []

    for (let i = 1; i <= this.numberOfRigs; i++) {
      const name = this.hostname.prefix + Rig.getId(i)
      const uri = `http://${name}:${this.api.port}${this.api.endpoint}`

      multiRequest.push(
        request.get(uri, {
          json: true,
          timeout: 1000
        })
          .then((body) => {
            return new Rig({
              name: name,
              miner: 'xmr-stak',
              hashrate: body.hashrate.highest,
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

module.exports = Datacenter
