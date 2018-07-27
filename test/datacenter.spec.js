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
    it('should return correct values', () => {
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

  // describe('getRigsThatAreFixed', () => {
  //   describe('should return', () => {
  //     it('rigs that become online again', () => {
  //       datacenter.stats.rigs.currently.offline = statsSample.rigs.currently.offline
  //       datacenter.getRigsThatAreFixed([])
  //         .should.have.lengthOf(statsSample.rigs.currently.offline.length)
  //     })
  //   })
  // })

  // describe('getStats', () => {
  //   let requestStub
  //   let bodyMock
  //   let hostname
  //   let api

  //   beforeEach(() => {
  //     requestStub = sinon.stub(request, 'get')
  //     bodyMock = {
  //       hashrate: {
  //         highest: 1000
  //       }
  //     }
  //     hostname = configDiscovery.hostname
  //     api = configDiscovery.api
  //   })

  //   afterEach(() => {
  //     requestStub.restore()
  //   })

  //   describe('should return', () => {
  //     describe('rigs that are currently online with correct data', () => {
  //       it('when rigs become online for the first time', async () => {
  //         const miner = 'xmr-stak'

  //         requestStub.resolves(bodyMock)

  //         const stats = await datacenter.getStats()

  //         stats.rigs.currently.online.should.have.lengthOf(configDiscovery.number_of_rigs)
  //         stats.rigs.currently.offline.should.have.lengthOf(0)

  //         for (let i = 0; i < configDiscovery.number_of_rigs; i++) {
  //           const rigId = Rig.getId(i + 1)
  //           const rig = stats.rigs.currently.online[i]
  //           const uri = `http://${hostname.prefix + rigId}:${api.port}${api.endpoint}`
            
  //           rig.name.should.equal(hostname.prefix + rigId)
  //           rig.miner.should.equal(miner)
  //           rig.hashrate.should.equal(bodyMock.hashrate.highest)
  //           rig.data.should.equal(bodyMock)

  //           requestStub.should.have.been.calledWith(uri)
  //         }
  //       })
  //     })
  //     describe('rigs that are currently online', () => {
  //       describe('and new online rigs', () => {
  //         it('when rigs become online for the first time', async () => {
  //           requestStub.resolves(bodyMock)
  
  //           const stats = await datacenter.getStats()
  
  //           stats.rigs.currently.online.should.have.lengthOf(configDiscovery.number_of_rigs)
  //           stats.rigs.currently.offline.should.have.lengthOf(0)
  //           stats.rigs.new.online.should.have.lengthOf(configDiscovery.number_of_rigs)
  //           stats.rigs.new.offline.should.have.lengthOf(0)
  //           stats.rigs.seen.should.have.lengthOf(configDiscovery.number_of_rigs)
  //           stats.rigs.fixed.should.have.lengthOf(0)
  //         })
  //         it('when new rigs become online', async () => {
  //           requestStub.resolves(bodyMock)
  
  //           const numberOfNewRigs = 3
  //           const numberOfRigs = configDiscovery.number_of_rigs + numberOfNewRigs
  
  //           await datacenter.getStats(configDiscovery.number_of_rigs)
  //           datacenter.numberOfRigs = numberOfRigs
  //           const stats = await datacenter.getStats(numberOfRigs)
  
  //           stats.rigs.currently.online.should.have.lengthOf(numberOfRigs)
  //           stats.rigs.currently.offline.should.have.lengthOf(0)
  //           stats.rigs.new.online.should.have.lengthOf(numberOfNewRigs)
  //           stats.rigs.new.offline.should.have.lengthOf(0)
  //           stats.rigs.seen.should.have.lengthOf(numberOfRigs)
  //           stats.rigs.fixed.should.have.lengthOf(0)
  //         })
  //       })
  //       describe('and fixed rigs', () => {
  //         it('when known offline rigs become online again', async () => {
  //           requestStub.resolves(bodyMock)

  //           await datacenter.getStats()
  //           datacenter.numberOfRigs
  //         })
  //       })
  //     })
  //     describe('rigs that are currently offline and new offline rigs', () => {
  //       it('when rigs become offline', async () => {
  //         requestStub.resolves(bodyMock)

  //         const numberOfNewOfflineRigs = 3
  //         const numberOfRigs = configDiscovery.number_of_rigs - numberOfNewOfflineRigs
  //         await datacenter.getStats()
  //         datacenter.numberOfRigs = numberOfRigs
  //         const stats = await datacenter.getStats()

  //         stats.rigs.currently.online.should.have.lengthOf(numberOfRigs)
  //         stats.rigs.currently.offline.should.have.lengthOf(numberOfNewOfflineRigs)
  //         stats.rigs.new.online.should.have.lengthOf(0)
  //         stats.rigs.new.offline.should.have.lengthOf(numberOfNewOfflineRigs)
  //         stats.rigs.seen.should.have.lengthOf(configDiscovery.number_of_rigs)
  //         stats.rigs.fixed.should.have.lengthOf(0)
  //       })
  //     })
  //   })

  //   describe('should not return', () => {
  //     describe('new online rigs', () => {
  //       it('when rigs had already became online', async () => {
  //         requestStub.resolves(bodyMock)

  //         await datacenter.getStats()
  //         const stats = await datacenter.getStats()

  //         stats.rigs.currently.online.should.have.lengthOf(configDiscovery.number_of_rigs)
  //         stats.rigs.currently.offline.should.have.lengthOf(0)
  //         stats.rigs.new.online.should.have.lengthOf(0)
  //         stats.rigs.new.offline.should.have.lengthOf(0)
  //         stats.rigs.seen.should.have.lengthOf(configDiscovery.number_of_rigs)
  //         stats.rigs.fixed.should.have.lengthOf(0)
  //       })
  //     })
  //   })

  //   // describe('should return only online rigs', () => {
  //   //   it('when rigs just became online for the first time', async () => {
  //   //     const miner = 'xmr-stak'

  //   //     requestStub.resolves(bodyMock)

  //   //     const stats = await datacenter.getStats()

  //   //     stats.onlineRigs.should.have.lengthOf(configDiscovery.number_of_rigs)
  //   //     stats.offlineRigs.should.have.lengthOf(0)

  //   //     for (let i = 0; i < configDiscovery.number_of_rigs; i++) {
  //   //       const rigId = Rig.getId(i + 1)
  //   //       const rig = stats.onlineRigs[i]
  //   //       const uri = `http://${hostname.prefix + rigId}:${api.port}${api.endpoint}`
          
  //   //       rig.name.should.equal(hostname.prefix + rigId)
  //   //       rig.miner.should.equal(miner)
  //   //       rig.hashrate.should.equal(bodyMock.hashrate.highest)
  //   //       rig.data.should.equal(bodyMock)

  //   //       requestStub.should.have.been.calledWith(uri)
  //   //     }
  //   //   })
  //   //   it('when rigs transitioned from offline to online', async () => {
  //   //     requestStub.resolves(bodyMock)

  //   //     await datacenter.getStats()

  //   //     requestStub.rejects(null)

  //   //     await datacenter.getStats()

  //   //     requestStub.resolves(bodyMock)

  //   //     const stats = await datacenter.getStats()

  //   //     stats.onlineRigs.should.have.lengthOf(configDiscovery.number_of_rigs)
  //   //     stats.offlineRigs.should.have.lengthOf(0)
  //   //   })
  //   //   it('when a new rig becomes online', async () => {
  //   //     requestStub.resolves(bodyMock)
  //   //     requestStub.withArgs(
  //   //       `http://${hostname.prefix}03:${api.port}${api.endpoint}`
  //   //     ).rejects(null)

  //   //     await datacenter.getStats()

  //   //     requestStub.reset()
  //   //     requestStub.resolves(bodyMock)

  //   //     const stats = await datacenter.getStats()

  //   //     stats.onlineRigs.should.have.lengthOf(configDiscovery.number_of_rigs)
  //   //     stats.offlineRigs.should.have.lengthOf(0)
  //   //   })
  //   // })

  //   // describe('should return no online and offline rigs', () => {
  //   //   it('when no rigs are online for the first time', async () => {
  //   //     requestStub.rejects(null)

  //   //     const stats = await datacenter.getStats()

  //   //     stats.onlineRigs.should.have.lengthOf(0)
  //   //     stats.offlineRigs.should.have.lengthOf(0)
  //   //   })
  //   // })

  //   // describe('should return some online and offline rigs', () => {
  //   //   it('when a rig becomes offline and the rest are still online', async () => {
  //   //     requestStub.resolves(bodyMock)

  //   //     await datacenter.getStats()

  //   //     requestStub.withArgs(
  //   //       `http://${hostname.prefix}03:${api.port}${api.endpoint}`
  //   //     ).rejects(null)

  //   //     const stats = await datacenter.getStats()

  //   //     stats.onlineRigs.should.have.lengthOf(configDiscovery.number_of_rigs - 1)
  //   //     stats.offlineRigs.should.have.lengthOf(1)
  //   //   })
  //   // })

  //   // describe('should return only offline rigs', () => {
  //   //   it('when all rigs transition from online to offline', async () => {
  //   //     requestStub.resolves(bodyMock)
      
  //   //     await datacenter.getStats()

  //   //     requestStub.rejects(null)

  //   //     let stats

  //   //     for (let i = 0; i < 10; i++) {
  //   //       stats = await datacenter.getStats()
  //   //     }

  //   //     stats.onlineRigs.should.have.lengthOf(0)
  //   //     stats.offlineRigs.should.have.lengthOf(configDiscovery.number_of_rigs)
  //   //   })
  //   // })
  // })
})