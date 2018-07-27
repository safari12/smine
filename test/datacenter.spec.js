const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const request = require('request-promise')
const _ = require('lodash')

const Rig = require('../lib/rig')
const Datacenter = require('../lib/datacenter')

const configMock = require('./config.mock')
const configDiscovery = configMock.discovery

const chai = require('chai')
chai.use(sinonChai)

describe('Datacenter', () => {
  var datacenter
  let statsSample
  let onlineRigsSample
  let offlineRigsSample
  let newOnlineRigsSample
  let newOfflineRigsSample

  beforeEach(() => {
    datacenter = new Datacenter(configDiscovery)

    onlineRigsSample = [{
      name: 's-m-01',
      hashrate: 4000
    }, {
      name: 's-m-02',
      hashrate: 5000
    }]

    newOnlineRigsSample = [{
      name: 's-m-05',
      hashrate: 3000,
    }, {
      name: 's-m-06',
      hashrate: 2000
    }]

    newOfflineRigsSample = [{
      name: 's-m-07',
      hashrate: 2000
    }, {
      name: 's-m-08',
      hashrate: 1000
    }]

    offlineRigsSample = [{
      name: 's-m-03',
      hashrate: 4000
    }]

    statsSample = {
      rigs: {
        seen: onlineRigsSample,
        currently: {
          online: onlineRigsSample,
          offline: offlineRigsSample
        }
      }
    }
  })

  describe('constructor', () => {
    it('should set correct values', () => {
      datacenter.numberOfRigs.should.equal(configDiscovery.number_of_rigs)
      datacenter.hostname.should.deep.equal(configDiscovery.hostname)
      datacenter.api.should.deep.equal(configDiscovery.api)
    })
  })

  describe('getFetchedOnlineRigs', () => [
    describe('should return', () => {
      it('no rigs on null', () => {
        datacenter.getFetchedOnlineRigs(_.times(10, _.constant(null)))
          .should.have.lengthOf(0)
      })
      it('rigs when not null', () => {
        datacenter.getFetchedOnlineRigs(onlineRigsSample)
          .should.deep.equal(onlineRigsSample)
      })
    })
  ])

  describe('getFetchedOfflineRigs', () => {
    describe('should return', () => {
      it('no rigs when there\'s no offline rigs', () => {
        datacenter.getFetchedOfflineRigs(
          statsSample.rigs.seen,
          statsSample.rigs.currently.online
        ).should.have.lengthOf(0)
      })
      it('rigs that are offline', () => {
        datacenter.getFetchedOfflineRigs(
          statsSample.rigs.seen,
          []
        ).should.deep.equal(statsSample.rigs.seen)
      })
    })
  })

  describe('getRigsThatBecameOnline', () => {
    describe('should return', () => {
      it('new online rigs that haven\'t been seen before', () => {
        datacenter.getRigsThatBecameOnline(
          newOnlineRigsSample,
          statsSample.rigs.seen
        ).should.deep.equal(newOnlineRigsSample)
      })
    })
    describe('should not return', () => {
      it('new online rigs when rigs have been seen before', () => {
        datacenter.getRigsThatBecameOnline(
          statsSample.rigs.currently.online,
          statsSample.rigs.seen
        ).should.have.lengthOf(0)
      })
    })
  })

  describe('getRigsThatBecameOffline', () => {
    describe('should return', () => {
      it('new offline rigs that haven\'t been seen before', () => {
        datacenter.getRigsThatBecameOffline(
          newOfflineRigsSample,
          statsSample.rigs.currently.offline
        ).should.deep.equal(newOfflineRigsSample)
      })
    })
    describe('should not return', () => {
      it('new offline rigs that have been seen before', () => {
        datacenter.getRigsThatBecameOffline(
          statsSample.rigs.currently.offline,
          statsSample.rigs.currently.offline
        ).should.have.lengthOf(0)
      })
    })
  })

  describe('getRigsThatAreFixed', () => {
    describe('should return', () => {
      it('rigs that become online again', () => {
        datacenter.getRigsThatAreFixed(
          statsSample.rigs.currently.offline,
          []
        ).should.deep.equal(statsSample.rigs.currently.offline)
      })
    })
    describe('should not return', () => {
      it('rigs that are not fixed and still offline', () => {
        datacenter.getRigsThatAreFixed(
          statsSample.rigs.currently.offline,
          statsSample.rigs.currently.offline
        ).should.have.lengthOf(0)
      })
    })
  })

  describe('fetchRigs', () => {
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

    describe('should call', () => {
      describe('request stub', () => {
        it('with correct arguements', async () => {
          const miner = 'xmr-stak'

          requestStub.resolves(bodyMock)

          const stats = await datacenter.getStats()

          stats.rigs.currently.online.should.have.lengthOf(configDiscovery.number_of_rigs)
          stats.rigs.currently.offline.should.have.lengthOf(0)

          for (let i = 0; i < configDiscovery.number_of_rigs; i++) {
            const rigId = Rig.getId(i + 1)
            const rig = stats.rigs.currently.online[i]
            const uri = `http://${hostname.prefix + rigId}:${api.port}${api.endpoint}`
            
            rig.name.should.equal(hostname.prefix + rigId)
            rig.miner.should.equal(miner)
            rig.hashrate.should.equal(bodyMock.hashrate.highest)
            rig.data.should.equal(bodyMock)

            requestStub.should.have.been.calledWith(uri)
          }
        })
      })
    })
  })

  describe('getStats', () => {
    let fetchRigsStub
    let getFixedRigsStub
    let getFetchedOnlineRigsStub
    let getFetchedOfflineRigsStub
    let getNewOnlineRigsStub
    let getNewOfflineRigsStub

    beforeEach(() => {
      fetchRigsStub = sinon.stub(datacenter, 'fetchRigs')
      getFixedRigsStub = sinon.stub(datacenter, 'getRigsThatAreFixed')
      getFetchedOnlineRigsStub = sinon.stub(datacenter, 'getFetchedOnlineRigs')
      getFetchedOfflineRigsStub = sinon.stub(datacenter, 'getFetchedOfflineRigs')
      getNewOnlineRigsStub = sinon.stub(datacenter, 'getRigsThatBecameOnline')
      getNewOfflineRigsStub = sinon.stub(datacenter, 'getRigsThatBecameOffline')

      getFixedRigsStub.returns([])
      getFetchedOnlineRigsStub.returns([])
      getFetchedOfflineRigsStub.returns([])
      getNewOnlineRigsStub.returns([])
      getNewOfflineRigsStub.returns([])
    })

    afterEach(() => {
      fetchRigsStub.restore()
      getFixedRigsStub.restore()
      getFetchedOnlineRigsStub.restore()
      getFetchedOfflineRigsStub.restore()
      getNewOnlineRigsStub.restore()
      getNewOfflineRigsStub.restore()
    })

    describe('when rigs become online for the first time', () => {
      beforeEach(() => {
        getFetchedOnlineRigsStub.returns(newOnlineRigsSample)
        getNewOnlineRigsStub.returns(newOnlineRigsSample)
      })

      describe('it should return stats', () => {
        let stats

        beforeEach(async () => {
          stats = await datacenter.getStats()
        })

        it('with rigs currently online', () => {
          stats.rigs.currently.online.should.deep.equal(newOnlineRigsSample)
        })
        it('with new online rigs', () => {
          stats.rigs.new.online.should.deep.equal(newOnlineRigsSample)
        })
        it('with rigs seen', () => {
          stats.rigs.seen.should.deep.equal(newOnlineRigsSample)
        })
        it('with no rigs currently offline', () => {
          stats.rigs.currently.offline.should.have.lengthOf(0)
        })
        it('with no new offline rigs', () => {
          stats.rigs.new.offline.should.have.lengthOf(0)
        })
        it('with no fixed rigs', () => {
          stats.rigs.fixed.should.have.lengthOf(0)
        })
      })
    })

    describe('when the same rigs stay online', () => {
      beforeEach(() => {
        getFetchedOnlineRigsStub.returns(onlineRigsSample)
      })

      describe('it should return stats', () => {
        let stats

        beforeEach(async () => {
          stats = _.last(
            _.times(10, )
          )
        })
      })
    })
  })
})