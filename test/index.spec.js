/* global describe, it, before */

import chai from 'chai';
import Xtate from '../lib/xtate.min';

chai.expect();

const expect = chai.expect;

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

let lib;

describe('When an async action function is registered', () => {
  before(() => {
    lib = new Xtate();

    lib.actionAsync('asyncTest', async function (state, payload) {
      await sleep(500);
      return { result: true };
    });
  });
  describe('When an async action function is registered', () => {
    it('It should recognize it is async, apply an await and update the store when finished', async () => {
      lib.dispatch('asyncTest');
      console.log('Giving some time to the async action function to update the Xtate store before validating');
      await sleep(1900);
      expect(lib.store.result).to.be.equal(true);
    });
  });
});
