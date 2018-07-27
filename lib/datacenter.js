const request = require('request-promise')
const _ = require('lodash')

const Rig = require('./rig')

/**
 * Class representing a datacenter with rigs
 */
class Datacenter {
  constructor(options) {
    this.numberOfRigs = options.number_of_rigs
    this.hostname = options.hostname
    this.api = options.api
    this.stats = {
      rigs: {
        seen: [],
        currently: {
          online: [],
          offline: []
        },
        new: {
          online: [],
          offline: []
        },
        fixed: []
      }
    }
  }

  async getStats() {
    const fetchRigs = await Promise.all(this.fetchRigs())
    const fetchedOnlineRigs = this.getFetchedOnlineRigs(fetchRigs)
    const fetchedOfflineRigs = this.getFetchedOfflineRigs(this.stats.rigs.seen, fetchedOnlineRigs)
    
    this.stats.rigs.new.online = this.getRigsThatBecameOnline(fetchedOnlineRigs, this.stats.rigs.seen)
    this.stats.rigs.new.offline = this.getRigsThatBecameOffline(fetchedOfflineRigs, this.stats.rigs.currently.offline)
    this.stats.rigs.fixed = this.getRigsThatAreFixed(this.stats.rigs.currently.offline, fetchedOfflineRigs)

    if (this.stats.rigs.new.online.length > 0) {
      this.stats.rigs.seen = _.concat(
        this.stats.rigs.seen, 
        this.stats.rigs.new.online
      )
    }

    this.stats.rigs.currently.online = fetchedOnlineRigs
    this.stats.rigs.currently.offline = fetchedOfflineRigs

    return this.stats
  }

  fetchRigs() {
    let multiRequest = []

    for (let i = 1; i <= this.numberOfRigs; i++) {
      const name = this.hostname.prefix + Rig.getId(i)
      const uri = `http://${name}:${this.api.port}${this.api.endpoint}`
      const timeout = this.api.timeout ? this.api.timeout : 1000

      multiRequest.push(
        request.get(uri, {
          json: true,
          timeout: timeout
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

  /**
   * returns rigs that are currently online
   * @param {Array} rigs 
   */
  getFetchedOnlineRigs(rigs) {
    return _.filter(rigs, (r) => r !== null)
  }

  /**
   * returns rigs that are currently offline
   * @param {Array} onlineRigs 
   */
  getFetchedOfflineRigs(seenRigs, fetchedOnlineRigs) {
    return _.differenceBy(seenRigs, fetchedOnlineRigs, 'name')
  }

  /**
   * returns rigs that became online
   * @param {Array} onlineRigs 
   */
  getRigsThatBecameOnline(fetchedOnlineRigs, seenRigs) {
    return _.differenceBy(fetchedOnlineRigs, seenRigs, 'name')
  }

  /**
   * returns rigs that became offline
   * @param {Array} offlineRigs 
   */
  getRigsThatBecameOffline(fetchedOfflineRigs, currentlyOfflineRigs) {
    return _.differenceBy(fetchedOfflineRigs, currentlyOfflineRigs, 'name')
  }

  /**
   * returns rigs that are fixed
   * @param {Array} offlineRigs 
   */
  getRigsThatAreFixed(currentlyOfflineRigs, fetchedOfflineRigs) {
    return _.differenceBy(currentlyOfflineRigs, fetchedOfflineRigs, 'name')
  }
}

module.exports = Datacenter
