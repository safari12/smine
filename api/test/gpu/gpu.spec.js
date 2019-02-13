const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const chai = require('chai')
chai.use(sinonChai)

const expect = require('chai').expect
const nock = require('nock')

const GPU = require('../../lib/gpu').model
const GPUConfig = require('../../lib/gpu/config')

const mockGPUCards = [
  {
    device: 0,
    name: 'GeoForce GTX 1070 TI',
    temp: 56,
    fan_speed: 21,
    volatile: 90,
    watt: {
      usage: 50,
      cap: 90
    },
    memory: {
      used: 5600,
      max: 8000
    }
  }
]

describe('GPU', () => {
  describe('syncCards', () => {
    beforeEach(() => {
      nock('http://s-m-01:6969')
        .get('/gpu')
        .reply(200, mockGPUCards)
    })

    it('should fetch multiple card stats', async () => {
      const stub = sinon.stub(GPUConfig, 'findById')
      stub.resolves({
        api: {
          endpoint: '/gpu',
          port: 6969
        }
      })

      const gpu = new GPU({})
      await gpu.syncCards('s-m-01')

      expect(gpu.cards).to.deep.equal(mockGPUCards)
    })
  })
})
