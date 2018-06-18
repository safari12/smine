const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const request = require('request-promise')

const Miner = require('../lib/miner/model')
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
  describe('getStats', () => {
    it('should return online miners with expected data', async () => {
      const expectedBody = { message: 'test' }
      const expectedNumberOfMiners = 5
      const expectedHostname = { prefix: 's-m-'}
      const expectedApi = { port: 6969, endpoint: '/api.json' }
      const expectedSoftware = 'xmr-stak'

      const stub = sinon.stub(request, 'get')
      stub.returns(
        new Promise((resolve) => {
          resolve(expectedBody)
        })
      )

      const minerDiscovery = new MinerDiscovery(
        expectedNumberOfMiners,
        expectedHostname,
        expectedApi
      )

      const stats = await minerDiscovery.getStats()

      stats.online.should.have.lengthOf(expectedNumberOfMiners)
      stats.offline.should.have.lengthOf(0)

      for (let i = 0; i < expectedNumberOfMiners; i++) {
        const minerId = Miner.getId(i + 1)
        const expectedUri = `http://${expectedHostname.prefix + minerId}:${expectedApi.port}${expectedApi.endpoint}`
        const miner = stats.online[i]

        miner.data.should.equal(expectedBody)
        miner.name.should.equal(expectedHostname.prefix + minerId)
        miner.software.should.equal(expectedSoftware)

        stub.should.have.been.calledWith(expectedUri)
      }

      stub.restore()
    })
  })
})