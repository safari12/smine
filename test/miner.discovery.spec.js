const sinonChai = require('sinon-chai')

const MinerDiscovery = require('../lib/miner/discovery')

const chai = require('chai')
chai.use(sinonChai)

describe('MinerDiscovery', () => {
  describe('constructor', () => {
    const data = {
      numberOfMiners: 100,
      hostname: {
        prefix: 's-m-'
      },
      api: {
        port: 6969,
        endpoint: 'hello'
      }
    }

    const minerDiscovery = new MinerDiscovery(
      data.numberOfMiners,
      data.hostname,
      data.api
    )

    minerDiscovery.numberOfMiners.should.equal(data.numberOfMiners)
    minerDiscovery.hostname.should.deep.equal(data.hostname)
    minerDiscovery.api.should.deep.equal(data.api)
  })
})