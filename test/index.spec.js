/* global describe, it, before */
import chai from 'chai';

chai.expect();

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

let lib;

describe('Before test', () => {
  before(() => {
  });
  describe('Test', () => {
    it('It should be true', async () => {
      chai.expect(true).to.be.equal(true);
    });
  });
});
