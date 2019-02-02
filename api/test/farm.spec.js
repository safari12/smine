const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const _ = require('lodash');

const Rig = require('../lib/rig');
const farm = require('../lib/farm');
const net = require('../lib/net');

const rigMock = require('./rig.mock');

const chai = require('chai');
const expect = chai.expect;
chai.use(sinonChai);

describe('Farm', () => {
  let mockRigs;

  beforeEach(() => {
    mockRigs = rigMock.generate();
  });

  describe('pingRigs', () => {
    let netPingStub;

    beforeEach(() => {
      netPingStub = sinon.stub(net, 'ping');
    });

    afterEach(() => {
      netPingStub.restore();
    });

    describe('when rigs are online', () => {
      it('should set pingable to true', async () => {
        netPingStub.returns(true);

        const rigs = await farm.pingRigs(mockRigs);

        _.each(rigs, r => {
          expect(r.pingable).to.be.true;
        });
      });
    });

    describe('when rigs are offline', () => {
      it('should set pingable to false', async () => {
        netPingStub.returns(false);

        const rigs = await farm.pingRigs(mockRigs);

        _.each(rigs, r => {
          expect(r.pingable).to.be.false;
        });
      });
    });

    describe('when some rigs are offline or online', () => {
      it('there should be a mix of pingable rigs', async () => {
        netPingStub.returns(true);

        _.each(_.range(1, 4), id => {
          netPingStub.withArgs(`s-m-${Rig.getId(id)}`).returns(false);
        });

        const rigs = await farm.pingRigs(mockRigs);

        for (let i = 0; i < rigs.length; i++) {
          if (i < 3) {
            expect(rigs[i].pingable).to.be.false;
          } else {
            expect(rigs[i].pingable).to.be.true;
          }
        }
      });
    });
  });
});
