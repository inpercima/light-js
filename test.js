'use strict';

/* requirements */
const assert = require('assert');
  // test not exported function with rewire
const rewire = require('rewire');

const lightjs = rewire('./index');

describe('command section', function() {
  describe('yarnpmCmd', function() {
    const yarnpmCmd = lightjs.__get__('yarnpmCmd');
    it('should return yarn', function() {
      assert.equal('yarn', yarnpmCmd(false));
    });
    it('should return npm', function() {
      assert.equal('npm', yarnpmCmd(true));
    });
  });
});
