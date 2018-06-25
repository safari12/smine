const sinonChai = require('sinon-chai')

const chai = require('chai')
chai.use(sinonChai)

const util = require('../lib/util')

describe('Util', () => {
  describe('getHumanReadableHashrate', () => {
    it('should return kilo hashrate format', () => {
      const hashrate = util.getHumanReadableHashrate(5000.6)
      hashrate.should.equal('5 KH/s')
    })
    it('should return mega hashrate format', () => {
      let hashrate = util.getHumanReadableHashrate(32000000.12)
      hashrate.should.equal('32 MH/s')
      hashrate = util.getHumanReadableHashrate(3200000.12)
      hashrate.should.equal('3.2 MH/s')
    })
    it('should return plain hashrate format', () => {
      const hashrate = util.getHumanReadableHashrate(945)
      hashrate.should.equal('945 H/s')
    })
  })
})
