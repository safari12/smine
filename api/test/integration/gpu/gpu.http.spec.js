const chai = require('chai')
const chaiHTTP = require('chai-http')
const chaiExclude = require('chai-exclude')
const expect = chai.expect

chai.use(chaiHTTP)
chai.use(chaiExclude)

const admin = require('admin')
const server = require('server')
const token = require('token')
const db = require('db')
const GPUConfig = require('gpu/config')
const GPUConfigSample = require('./config/sample')
const User = require('user')

describe('GPU', () => {
  let adminToken

  before(async () => {
    await db.connect()
    await admin.create()
    const user = await User.findOne({ admin: true })
    adminToken = await token.create(user)
  })

  describe('Config', () => {
    let sampleGpuConfigs

    beforeEach(async () => {
      sampleGpuConfigs = GPUConfigSample.generate()
      await GPUConfig.deleteMany({})
      await GPUConfig.insertMany(sampleGpuConfigs)
    })

    describe('GET gpu/configs', () => {
      it('should return all gpu configs for admin', async () => {
        const response = await chai
          .request(server)
          .get('/gpu/configs')
          .set('x-access-token', adminToken)

        expect(response).to.have.status(200)
        expect(response.body).to.have.lengthOf(10)
        expect(response.body)
          .excluding(['_id', '__v'])
          .to.eql(sampleGpuConfigs)
      })
    })
  })
})
