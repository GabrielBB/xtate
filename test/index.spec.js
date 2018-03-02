/* global describe, it, before */

import chai from 'chai';
import { Xtate } from '../lib/xtate.min';

chai.expect();

const expect = chai.expect;

let lib;

describe('When i check the logChanges boolean', () => {
  before(() => {
    lib = new Xtate();
  });
  describe('When i check the logChanges boolean', () => {
    it('should return the value', () => {
      expect(lib.logChanges).to.be.equal(false);
    });
  });
});
