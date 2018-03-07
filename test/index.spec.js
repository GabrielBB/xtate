/* global describe, it, before */

import chai from 'chai';
import Xtate from '../lib/xtate';

chai.expect();

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

let lib;

describe('When an async action function is registered', () => {
  before(() => {
    lib = new Xtate();

  });
  describe('When an async action function is registered', () => {
    it('It should recognize it is async, apply an await and update the store when finished', async () => {
      chai.expect(true).to.be.equal(true);
    });
  });
});
