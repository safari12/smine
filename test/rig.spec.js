const sinonChai = require('sinon-chai')

const chai = require('chai')
chai.use(sinonChai)

const Rig = require('../lib/rig')

describe('Rig', () => {
  describe('constructor', () => {
    it('should set properties', () => {
      const data = {
        name: 's-m-12',
        miner: 'xmr-stak',
        hashrate: 4000,
        data: {}
      }

      const rig = new Rig(data)
      rig.should.deep.equal(data)
    })
  })
  describe('getId', () => {
    it('should append 0 to number if less than 10', () => {
      const id = Rig.getId(5)
      id.should.equal('05')
    })
    it('should return the same number if greater than 9', () => {
      const id = Rig.getId(15)
      id.should.equal('15')
    })
  })
  describe('getTotalHashrate', () => {
    it('should return total hashrate of rigs', () => {
      let totalHashrate = 0
      let rigs = []

      for (let i = 0; i < 5; i++) {
        totalHashrate += 1000
        rigs.push(
          new Rig({
            hashrate: 1000
          })
        )
      }

      Rig.getTotalHashrate(rigs).should.equal(totalHashrate)
    })
    it('should return zero', () => {
      const rigs = []
      Rig.getTotalHashrate(rigs).should.equal(0)
    })
  })
})
