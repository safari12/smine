const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const request = require('request-promise')

const Rig = require('../lib/rig')
const Datacenter = require('../lib/datacenter')

const configMock = require('./config.mock')
const configDiscovery = configMock.discovery

const chai = require('chai')
chai.use(sinonChai)

describe('Datacenter', () => {
  var datacenter

  beforeEach(() => {
    datacenter = new Datacenter(configDiscovery)
  })

  describe('constructor', () => {
    it('should return correct values', () => {
      datacenter.numberOfRigs.should.equal(configDiscovery.number_of_rigs)
      datacenter.hostname.should.deep.equal(configDiscovery.hostname)
      datacenter.api.should.deep.equal(configDiscovery.api)
    })
  })

  describe('getStats', () => {
    let requestStub
    let bodyMock
    let hostname
    let api

    beforeEach(() => {
      requestStub = sinon.stub(request, 'get')
      bodyMock = {
        hashrate: {
          highest: 1000
        }
      }
      hostname = configDiscovery.hostname
      api = configDiscovery.api
    })

    afterEach(() => {
      requestStub.restore()
    })

    describe('should return only online rigs', () => {
      it('when rigs just became online for the first time', async () => {
        const miner = 'xmr-stak'

        requestStub.resolves(bodyMock)

        const stats = await datacenter.getStats()

        stats.onlineRigs.should.have.lengthOf(configDiscovery.number_of_rigs)
        stats.offlineRigs.should.have.lengthOf(0)

        for (let i = 0; i < configDiscovery.number_of_rigs; i++) {
          const rigId = Rig.getId(i + 1)
          const rig = stats.onlineRigs[i]
          const uri = `http://${hostname.prefix + rigId}:${api.port}${api.endpoint}`
          
          rig.name.should.equal(hostname.prefix + rigId)
          rig.miner.should.equal(miner)
          rig.hashrate.should.equal(bodyMock.hashrate.highest)
          rig.data.should.equal(bodyMock)

          requestStub.should.have.been.calledWith(uri)
        }
      })
      it('when rigs transitioned from offline to online', async () => {
        requestStub.resolves(bodyMock)

        await datacenter.getStats()

        requestStub.rejects(null)

        await datacenter.getStats()

        requestStub.resolves(bodyMock)

        const stats = await datacenter.getStats()

        stats.onlineRigs.should.have.lengthOf(configDiscovery.number_of_rigs)
        stats.offlineRigs.should.have.lengthOf(0)
      })
      it('when a new rig becomes online', async () => {
        requestStub.resolves(bodyMock)
        requestStub.withArgs(
          `http://${hostname.prefix}03:${api.port}${api.endpoint}`
        ).rejects(null)

        await datacenter.getStats()

        requestStub.reset()
        requestStub.resolves(bodyMock)

        const stats = await datacenter.getStats()

        stats.onlineRigs.should.have.lengthOf(configDiscovery.number_of_rigs)
        stats.offlineRigs.should.have.lengthOf(0)
      })
    })

    describe('should return no online and offline rigs', () => {
      it('when no rigs are online for the first time', async () => {
        requestStub.rejects(null)

        const stats = await datacenter.getStats()

        stats.onlineRigs.should.have.lengthOf(0)
        stats.offlineRigs.should.have.lengthOf(0)
      })
    })

    describe('should return some online and offline rigs', () => {
      it('when a rig becomes offline and the rest are still online', async () => {
        requestStub.resolves(bodyMock)

        await datacenter.getStats()

        requestStub.withArgs(
          `http://${hostname.prefix}03:${api.port}${api.endpoint}`
        ).rejects(null)

        const stats = await datacenter.getStats()

        stats.onlineRigs.should.have.lengthOf(configDiscovery.number_of_rigs - 1)
        stats.offlineRigs.should.have.lengthOf(1)
      })
    })

    describe('should return only offline rigs', () => {
      it('when all rigs transition from online to offline', async () => {
        requestStub.resolves(bodyMock)
      
        await datacenter.getStats()

        requestStub.rejects(null)

        let stats

        for (let i = 0; i < 10; i++) {
          stats = await datacenter.getStats()
        }

        stats.onlineRigs.should.have.lengthOf(0)
        stats.offlineRigs.should.have.lengthOf(configDiscovery.number_of_rigs)
      })
    })
  })
})