'use strict';

import { readFileSync } from 'node:fs';

/* requirements */
import { equal } from 'assert';
// to test not exported functions in a lib, use rewire
import rewire from 'rewire';

const lightjs = rewire('./index');

describe('command section', function() {
  describe('yarnpmCmd', function() {
    const yarnpmCmd = lightjs.__get__('yarnpmCmd');
    it('should return yarn', function() {
      equal('yarn', yarnpmCmd(false));
    });
    it('should return npm', function() {
      equal('npm', yarnpmCmd(true));
    });
  });

  describe('replacement', function() {
    const replacement = lightjs.replacement;
    it('should replace "more than one line" with "four lines"', function() {
      const filename = './test-files/test-a.txt';
      replacement('more than one line', 'four lines', [filename]);
      var content = readFileSync(filename, "utf-8");
      equal('It is a test file.\n\nIt has four lines.\n', content);
    });
  });
});
