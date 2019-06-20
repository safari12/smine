const fs = require('fs');
const path = require('path');
const chai = require('chai');

chai.should();

const parser = require('../../../lib/miner/parsers/bminer');

describe('miner parsers', () => {
  describe('bminer', () => {
    describe('getHashrate', () => {
      it('should return total hashrate for miner', () => {
        const miner = {
          type: 'bminer',
          coin: 'grin'
        };
        let response = fs.readFileSync(
          path.resolve(__dirname, '../../sample.json')
        );
        response = JSON.parse(response);

        const hashrate = parser.getHashrate(miner, response);
        hashrate.should.equal(27.1);
      });
    });
  });
});
