const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const _ = require('lodash')

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
      notifications.alreadySeenBefore.should.have.lengthOf(0)
      notifications.alreadyOfflineBefore.should.have.lengthOf(0)
    })
  })

  describe('notifyStatsIfNeeded', () => {
    let stats
    const email = {
      subjectPattern: /SMine - Stats Update/,
      fixedRigPattern: /fixed and back online/,
      offlineRigPattern: /became offline/,
      onlineRigPattern: /became online/,
      stillOfflineRigPattern: /still offline/
    }

    beforeEach(() => {
      stats = {
        onlineRigs: [{
          name: 's-m-12',
          hashrate: 4000
        }, {
          name: 's-m-14',
          hashrate: 4000
        }],
        offlineRigs: [{
          name: 's-m-15',
          hashrate: 3000
        }, {
          name: 's-m-16',
          hashrate: 4000
        }]
      }
    })

    describe('should send mail', () => {
      it('when new rigs become online', () => {
        stats.offlineRigs = []

        notifications.notifyStatsIfNeeded(stats).should.be.true

        mailerStub.sendMail.should.have.been.calledOnce
        mailerStub.sendMail.should.have.been.calledWithMatch(
          /SMine - Stats Update/,
          /became online/
        )
        mailerStub.sendMail.should.not.have.been.calledWithMatch(
          /blah/,
          /became offline/
        )
        mailerStub.sendMail.should.not.have.been.calledWithMatch(
          /blah/,
          /fixed and back online/
        )
        mailerStub.sendMail.should.not.have.been.calledWithMatch(
          /blah/,
          /still offline/
        )
      })
      it('when rigs become offline', () => {
        stats.onlineRigs = []
        notifications.notifyStatsIfNeeded(stats).should.be.true

        mailerStub.sendMail.should.have.been.calledOnce
        mailerStub.sendMail.should.have.been.calledWithMatch(
          /SMine - Stats Update/,
          /became offline/
        )
        mailerStub.sendMail.should.not.have.been.calledWithMatch(
          /blah/,
          /became online/
        )
        mailerStub.sendMail.should.not.have.been.calledWithMatch(
          /blah/,
          /fixed and back online/
        )
        mailerStub.sendMail.should.not.have.been.calledWithMatch(
          /blah/,
          /still offline/
        )
      })
      it('when a rig is fixed', () => {
        stats.offlineRigs = []

        notifications.notifyStatsIfNeeded(stats).should.be.true

        stats.offlineRigs = _.remove(stats.onlineRigs, ['name', 's-m-14'])

        notifications.notifyStatsIfNeeded(stats).should.be.true

        stats.onlineRigs = _.concat(stats.onlineRigs, stats.offlineRigs)
        stats.offlineRigs = []

        notifications.notifyStatsIfNeeded(stats).should.be.true

        const stubCalled = mailerStub.sendMail.thirdCall

        mailerStub.sendMail.should.have.been.calledThrice

        stubCalled.should.have.been.calledWithMatch(
          email.subjectPattern,
          email.fixedRigPattern
        )

        stubCalled.should.not.have.been.calledWithMatch(
          email.subjectPattern,
          email.onlineRigPattern
        )

        stubCalled.should.not.have.been.calledWithMatch(
          email.subjectPattern,
          email.offlineRigPattern
        )
        
        stubCalled.should.not.have.been.calledWithMatch(
          email.subjectPattern,
          email.stillOfflineRigPattern
        )
      })
      it('when a rig is fixed and some are still offline', () => {
        notifications.notifyStatsIfNeeded(stats)
        stats.offlineRigs = [{
          name: 's-m-16',
          hashrate: 4000
        }]
        notifications.notifyStatsIfNeeded(stats).should.be.true

        mailerStub.sendMail.should.have.been.calledTwice
        mailerStub.sendMail.should.have.been.calledWithMatch(
          /SMine - Stats Update/,
          /fixed and back online/
        )
        mailerStub.sendMail.should.have.been.calledWithMatch(
          /SMine - Stats Update/,
          /still offline/
        )
        mailerStub.sendMail.should.not.have.been.calledWithMatch(
          /blah/,
          /became online/
        )
        mailerStub.sendMail.should.not.have.been.calledWithMatch(
          /blah/,
          /became offline/
        )
      })
    })

    describe('should not send mail', () => {
      describe('when stats have already been notified for', () => {
        it('online rigs', () => {
          stats.offlineRigs = []
          notifications.notifyStatsIfNeeded(stats)

          _.times(10, () => {
            notifications.notifyStatsIfNeeded(stats).should.be.false
          })
  
          mailerStub.sendMail.should.have.been.calledOnce
        })
        it('offline rigs', () => {
          stats.onlineRigs = []
          notifications.notifyStatsIfNeeded(stats)

          _.times(10, () => {
            notifications.notifyStatsIfNeeded(stats).should.be.false
          })
  
          mailerStub.sendMail.should.have.been.calledOnce
        })
        it('fixed rigs', () => {
          stats.onlineRigs = [{
            name: 's-m-12',
            hashrate: 4000
          }, {
            name: 's-m-14',
            hashrate: 4000
          }, {
            name: 's-m-15',
            hashrate: 3000
          }]
  
          stats.offlineRigs = [{
            name: 's-m-16',
            hashrate: 4000
          }]
  
          notifications.notifyStatsIfNeeded(stats)

          _.times(10, () => {
            notifications.notifyStatsIfNeeded(stats).should.be.false
          })
  
          mailerStub.sendMail.should.have.been.calledOnce
        })
      })
    })
  })
})
