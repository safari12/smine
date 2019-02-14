const sinon = require('sinon')
const expect = require('chai').expect
const nock = require('nock')

const GPU = require('gpu').model
const GPUConfig = require('gpu/config')
const mockGPUCards = require('./mock/cards')

describe('GPU', () => {
  describe('syncCards', () => {
    let configStub

    beforeEach(() => {
      nock('http://s-m-01:6969')
        .get('/gpu')
        .reply(200, mockGPUCards)

      configStub = sinon.stub(GPUConfig, 'findById')
    })

    afterEach(() => {
      configStub.restore()
    })

    it('should fetch multiple card stats from a valid api', async () => {
      configStub.resolves({
        api: {
          endpoint: '/gpu',
          port: 6969
        }
      })

      const gpu = new GPU({})
      await gpu.syncCards('s-m-01')

      expect(gpu.cards).to.deep.equal(mockGPUCards)
    })

    it('should empty cards if there was an error on gpu api', async () => {
      configStub.resolves({
        api: {
          endpoint: '/blasdf',
          port: 1234,
          timeout: 100,
          retry: 0
        }
      })

      const gpu = new GPU({})
      await gpu.syncCards('s-m-01')

      expect(gpu.cards).to.have.lengthOf(0)
    })
  })
})
