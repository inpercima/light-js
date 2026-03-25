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

  describe('commandExists', function() {
    const commandExists = lightjs.__get__('commandExists');
    it('should return true for node', function() {
      equal(true, commandExists('node'));
    });
    it('should return false for a non-existent command', function() {
      equal(false, commandExists('__non_existent_command_xyz__'));
    });
  });

  describe('yarnpm selection', function() {
    let origCommandExists;
    beforeEach(function() {
      origCommandExists = lightjs.__get__('commandExists');
    });
    afterEach(function() {
      lightjs.__set__('commandExists', origCommandExists);
      lightjs.__set__('isNpmDefault', false);
    });

    it('should use yarn when it exists and isNpmDefault is false', function() {
      const called = [];
      lightjs.__set__('commandExists', (cmd) => cmd === 'yarn');
      lightjs.__set__('isNpmDefault', false);
      // Override execa.commandSync to capture calls without running
      const execaOrig = lightjs.__get__('execa');
      const fakeExeca = Object.assign(
        function() {},
        execaOrig,
        { commandSync: (cmdLine) => { called.push(cmdLine); } }
      );
      lightjs.__set__('execa', fakeExeca);
      lightjs.yarnpm('-v');
      lightjs.__set__('execa', execaOrig);
      equal('yarn -v', called[0]);
    });

    it('should fall back to npm when yarn is missing and isNpmDefault is false', function() {
      const called = [];
      lightjs.__set__('commandExists', (cmd) => cmd === 'npm');
      lightjs.__set__('isNpmDefault', false);
      const execaOrig = lightjs.__get__('execa');
      const fakeExeca = Object.assign(
        function() {},
        execaOrig,
        { commandSync: (cmdLine) => { called.push(cmdLine); } }
      );
      lightjs.__set__('execa', fakeExeca);
      lightjs.yarnpm('-v');
      lightjs.__set__('execa', execaOrig);
      equal('npm -v', called[0]);
    });

    it('should use npm when it exists and isNpmDefault is true', function() {
      const called = [];
      lightjs.__set__('commandExists', (cmd) => cmd === 'npm');
      lightjs.__set__('isNpmDefault', true);
      const execaOrig = lightjs.__get__('execa');
      const fakeExeca = Object.assign(
        function() {},
        execaOrig,
        { commandSync: (cmdLine) => { called.push(cmdLine); } }
      );
      lightjs.__set__('execa', fakeExeca);
      lightjs.yarnpm('-v');
      lightjs.__set__('execa', execaOrig);
      equal('npm -v', called[0]);
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
