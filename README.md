# About this - light-js
[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)
[![dependencies Status](https://david-dm.org/inpercima/swaaplate-tools/status.svg)](https://david-dm.org/inpercima/swaaplate-tools)
[![devDependencies Status](https://david-dm.org/inpercima/swaaplate-tools/dev-status.svg)](https://david-dm.org/inpercima/swaaplate-tools?type=dev)

Simple tools to work together with swaaplate.

# Prerequisites
## Node, npm or yarn
* `node 6.9.0` or higher in combination with
  * `npm 5.6.0` or higher or
  * `yarn 1.3.0` or higher, used in this repository

# Installation

```
# add to package.json
"swaaplate-tools": "0.1.0"
```

# Usage

```


const sTools = require('swaaplate-tools');

# logging
sTools.error('an error log.');
sTools.info('an info log.');
sTools.success('a success log.');
sTools.warn('a warn log.');

// run command with yarn or npm
sTools.yarnpm('-v');

// run a command with options
sTools.exec('docker', '-v', false);
sTools.exec('yarn', '-v', false);

sTools.exec('not-existing-command', 'options', false);

sTools.exec('another-not-existing-command', 'options');
```
