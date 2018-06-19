const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const fs = require('fs')

const mockConfig = require('./config.mock')
const configparser = require('../lib/config/parser')

const chai = require('chai')
const should = chai.should()
chai.use(sinonChai)

describe('ConfigParser', () => {
  describe('readFile', () => {
    it('should return config if json file is valid', () => {
      const stub = sinon.stub(fs, 'readFileSync')
      stub.returns(JSON.stringify(mockConfig))

      const filepath = '~/test/config.json'

      let config

      should.not.Throw(() => {
        config = configparser.readFile(filepath)
      })

      stub.should.have.been.calledOnceWith(filepath)
      config.should.deep.equal(mockConfig)

      stub.restore()
    })

    it('should throw error if json file is invalid', () => {
      const invalidConfig = Object.assign({}, mockConfig)
      invalidConfig.discovery = {}

      const stub = sinon.stub(fs, 'readFileSync')
      stub.returns(JSON.stringify(invalidConfig))

      should.Throw(() => {
        configparser.readFile('~/test/config.json')
      })

      stub.restore()
    })
  })
})
