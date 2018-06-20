const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const Mailer = require('../lib/mailer')
const Notifications = require('../lib/notifications')

const chai = require('chai')
chai.use(sinonChai)

describe('Notifications', () => {
  let notifications
  let mailerStub

  beforeEach(() => {
    mailerStub = sinon.createStubInstance(Mailer)
    notifications = new Notifications(mailerStub)
  })

  afterEach(() => {
    mailerStub.sendMail.restore()
  })

  describe('constructor', () => {
    it('should set values correctly', () => {
      notifications.mailer.should.exist
      notifications.alreadyNotified.should.deep.equal({
        offlineRigs: [],
        onlineRigs: []
      })
    })
  })

  describe('notifiyOnlineStats', () => {
    let stats

    beforeEach(() => {
      stats = {
        onlineRigs: [{
          name: 's-m-12',
          hashrate: 1000
        }, {
          name: 's-m-13',
          hashrate: 2000
        }],
      } 
    })

    it('should notify when rigs just became online', () => {
      notifications.notifyOnlineStats(stats)
      mailerStub.sendMail.should.have.been.calledOnce
    })

    it('should not notify when online rigs become offline', () => {
      stats.onlineRigs = []
      notifications.notifyOnlineStats(stats)

      mailerStub.sendMail.should.not.have.been.called
    })

    it('should notify when new rigs become online', () => {      
      notifications.notifyOnlineStats(stats)
      notifications.notifyOnlineStats({
        onlineRigs: [{
          name: 's-m-12',
          hashrate: 1000
        }, {
          name: 's-m-13',
          hashrate: 2000
        }, {
          name: 's-m-14',
          hashrate: 3000
        }],
      })

      mailerStub.sendMail.should.have.been.calledTwice
    })
  })

  describe('notifyOfflineStats', () => {
    let stats

    beforeEach(() => {
      stats = {
        offlineRigs: [{
          name: 's-m-12',
          hashrate: 3000
        }, {
          name: 's-m-13',
          hashrate: 2000
        }, {
          name: 's-m-14',
          hashrate: 5000
        }]
      }
    })

    it('should notify when rigs just became offline', () => {
      notifications.notifyOfflineStats(stats)
      mailerStub.sendMail.should.have.been.calledOnce
    })

    it('should notify when some rigs are fixed meaning online', () => {
      notifications.notifyOfflineStats(stats)
      notifications.notifyOfflineStats({
        offlineRigs: [{
          name: 's-m-12',
          hashrate: 3000
        }, {
          name: 's-m-14',
          hashrate: 5000
        }]
      })

      mailerStub.sendMail.should.have.been.calledTwice
    })

    it('should notify when more rigs become offline', () => {
      notifications.notifyOfflineStats(stats)
      notifications.notifyOfflineStats({
        offlineRigs: [{
          name: 's-m-12',
          hashrate: 3000
        }, {
          name: 's-m-13',
          hashrate: 2000
        }, {
          name: 's-m-14',
          hashrate: 5000
        }, {
          name: 's-m-15',
          hashrate: 6000
        }]
      })

      mailerStub.sendMail.should.have.calledTwice
    })

    it('should not notify when the same rigs are offline', () => {
      notifications.notifyOfflineStats(stats)
      notifications.notifyOfflineStats(stats)

      mailerStub.sendMail.should.have.been.calledOnce
    })
  })
})
