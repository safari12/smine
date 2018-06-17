const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const chai = require('chai')
const should = chai.should()
chai.use(sinonChai)

const Miner = require('../lib/miner/model')

describe('Miner', () => {
  describe('constructor', () => {
    it('should set properties', () => {
      const data = {
        name: 'hello',
        software: 'test',
        data: {
          hashrate: 1234
        }
      }
      const miner = new Miner(data)
      
      miner.should.deep.equal(data)
    })
  })
  describe('getId', () => {
    it('should append 0 to number if less than 10', () => {
      const id = Miner.getId(5)
      id.should.equal('05')
    })
    it('should return the same number if greater than 9', () => {
      const id = Miner.getId(15)
      id.should.equal('15')
    })
  })
})
