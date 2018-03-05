const lightJs = require('light-js');

// logging
lightJs.error('an error log.');
lightJs.info('an info log.');
lightJs.success('a success log.');
lightJs.warn('a warn log.');

// run command with yarn or npm
lightJs.yarnpm('-v');

// run a command with options
lightJs.exec('docker', '-v', false);
lightJs.exec('yarn', '-v', false);

lightJs.exec('not-existing-command', 'options', false);

lightJs.exec('another-not-existing-command', 'options');