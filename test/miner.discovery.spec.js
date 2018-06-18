const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const request = require('request-promise')

const Miner = require('../lib/miner')
const MinerDiscovery = require('../lib/miner/discovery')

const chai = require('chai')
chai.use(sinonChai)

describe('MinerDiscovery', () => {
  describe('constructor', () => {
    const data = {
      number_of_miners: 100,
      hostname: {
        prefix: 's-m-'
      },
      api: {
        port: 6969,
        endpoint: 'hello'
      }
    }

    const minerDiscovery = new MinerDiscovery(data)

    minerDiscovery.numberOfMiners.should.equal(data.number_of_miners)
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

      const minerDiscovery = new MinerDiscovery({
        number_of_miners: expectedNumberOfMiners,
        hostname: expectedHostname,
        api: expectedApi
      })

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

    it('should return no online and offline miners', async () => {
      const stub = sinon.stub(request, 'get')
      stub.returns(
        new Promise((resolve, reject) => {
          reject(null)
        })
      )

      const minerDiscovery = new MinerDiscovery({
        number_of_miners: 5,
        hostname: 'test',
        api: 'test'
      })
      const stats = await minerDiscovery.getStats()

      stats.online.should.have.lengthOf(0)
      stats.offline.should.have.lengthOf(0)

      stub.restore()
    })

    it('should transition from online to offline to online miners', async () => {
      const expectedNumberOfMiners = 5

      const stub = sinon.stub(request, 'get')
      stub.returns(
        new Promise((resolve) => {
          resolve({
            message: 'test'
          })
        })
      )

      const minerDiscovery = new MinerDiscovery({
        number_of_miners: expectedNumberOfMiners,
        hostname: 'test',
        api: 'test'
      })

      let stats = await minerDiscovery.getStats()

      stats.online.should.have.lengthOf(expectedNumberOfMiners)
      stats.offline.should.have.lengthOf(0)

      stub.returns(
        new Promise((resolve, reject) => {
          reject(null)
        })
      )

      stats = await minerDiscovery.getStats()

      stats.online.should.have.lengthOf(0)
      stats.offline.should.have.lengthOf(expectedNumberOfMiners)

      stub.returns(
        new Promise((resolve) => {
          resolve({
            message: 'test'
          })
        })
      )

      stats = await minerDiscovery.getStats()

      stats.online.should.have.lengthOf(expectedNumberOfMiners)
      stats.offline.should.have.lengthOf(0)

      stub.restore()
    })

    it('should return four online and one offline machine', async () => {
      const numberOfMiners = 5
      const hostname = {
        prefix: 's-m-'
      }
      const api = {
        port: 6969,
        endpoint: '/api.json'
      }
      const data = {
        message: 'test'
      }

      const stub = sinon.stub(request, 'get')
      stub.resolves(data)

      const minerDiscovery = new MinerDiscovery({
        number_of_miners: numberOfMiners,
        hostname: hostname,
        api: api
      })

      let stats = await minerDiscovery.getStats()

      stub.withArgs('http://s-m-03:6969/api.json').rejects(null)

      stats = await minerDiscovery.getStats()

      stats.online.should.have.lengthOf(4)
      stats.offline.should.have.lengthOf(1)

      stub.restore()
    })
  })
})