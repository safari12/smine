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
    })
  })

  describe('notifyStatsIfNeeded', () => {
    const email = {
      subjectPattern: /SMine - Stats Update/,
      fixedRigPattern: /fixed and back online/,
      offlineRigPattern: /became offline/,
      onlineRigPattern: /became online/,
      stillOfflineRigPattern: /still offline/
    }

    let statsMock

    beforeEach(() => {
      statsMock = _.cloneDeep(require('./stats.mock'))
    })

    describe('when new rigs become online', () => {
      it('should send mail with the new online rigs', () => {
        statsMock.rigs.currently.offline = []
        statsMock.rigs.new.online = statsMock.rigs.currently.online

        notifications.notifyStatsIfNeeded(statsMock).should.be.true

        mailerStub.sendMail.should.have.been.calledOnce
        mailerStub.sendMail.should.have.been.calledWithMatch(
          email.subjectPattern,
          email.onlineRigPattern
        )
        mailerStub.sendMail.should.not.have.been.calledWithMatch(
          sinon.match.any,
          email.offlineRigPattern
        )
        mailerStub.sendMail.should.not.have.been.calledWithMatch(
          sinon.match.any,
          email.fixedRigPattern
        )
        mailerStub.sendMail.should.not.have.been.calledWithMatch(
          sinon.match.any,
          email.stillOfflineRigPattern
        )
      })
    })

    describe('when rigs become offline', () => {
      it('should send mail with offline rigs', () => {
        statsMock.rigs.new.offline = statsMock.rigs.currently.offline

        notifications.notifyStatsIfNeeded(statsMock).should.be.true

        mailerStub.sendMail.should.have.been.calledOnce
        mailerStub.sendMail.should.have.been.calledWithMatch(
          email.subjectPattern,
          email.offlineRigPattern
        )
        mailerStub.sendMail.should.not.have.been.calledWithMatch(
          sinon.match.any,
          email.onlineRigPattern
        )
        mailerStub.sendMail.should.not.have.been.calledWithMatch(
          sinon.match.any,
          email.fixedRigPattern
        )
        mailerStub.sendMail.should.not.have.been.calledWithMatch(
          sinon.match.any,
          email.stillOfflineRigPattern
        )
      })
    })

    describe('when rigs get fixed and go back online', () => {
      it('should send mail with fixed rigs', () => {
        statsMock.rigs.fixed = statsMock.rigs.currently.offline
        statsMock.rigs.currently.offline = []

        notifications.notifyStatsIfNeeded(statsMock)

        mailerStub.sendMail.should.have.been.calledOnce
        mailerStub.sendMail.should.have.been.calledWithMatch(
          email.subjectPattern,
          email.fixedRigPattern
        )
        mailerStub.sendMail.should.not.have.been.calledWithMatch(
          sinon.match.any,
          email.onlineRigPattern
        )
        mailerStub.sendMail.should.not.have.been.calledWithMatch(
          sinon.match.any,
          email.offlineRigPattern
        )
        mailerStub.sendMail.should.not.have.been.calledWithMatch(
          sinon.match.any,
          email.stillOfflineRigPattern
        )
      })
    })

    describe('when rigs get fixed and some are still offline', () => {
      it('should send mail with fixed rigs and offline ones', () => {
        statsMock.rigs.fixed = statsMock.rigs.currently.offline
        statsMock.rigs.currently.offline = statsMock.rigs.currently.online

        notifications.notifyStatsIfNeeded(statsMock)

        mailerStub.sendMail.should.have.been.calledOnce
        mailerStub.sendMail.should.have.been.calledWithMatch(
          email.subjectPattern,
          email.fixedRigPattern
        )
        mailerStub.sendMail.should.have.been.calledWithMatch(
          email.subjectPattern,
          email.stillOfflineRigPattern
        )
        mailerStub.sendMail.should.not.have.been.calledWithMatch(
          sinon.match.any,
          email.onlineRigPattern
        )
        mailerStub.sendMail.should.not.have.been.calledWithMatch(
          sinon.match.any,
          email.offlineRigPattern
        )
      })
    })

    describe('when no rigs become online, offline, or fixed', () => {
      it('should not send mail', () => {
        notifications.notifyStatsIfNeeded(statsMock)
        mailerStub.sendMail.should.not.have.been.called
      })
    })
  })
})
