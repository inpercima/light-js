# About this - light-js
[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)
[![dependencies Status](https://david-dm.org/inpercima/swaaplate-tools/status.svg)](https://david-dm.org/inpercima/swaaplate-tools)
[![devDependencies Status](https://david-dm.org/inpercima/swaaplate-tools/dev-status.svg)](https://david-dm.org/inpercima/swaaplate-tools?type=dev)

Simple utils working with fs, shelljs and colors.

# Prerequisites
## Node, npm or yarn
* `node 6.9.0` or higher in combination with
  * `npm 5.6.0` or higher or
  * `yarn 1.3.0` or higher, used in this repository

# Installation

```
# add to package.json
"light-js": "inpercima/light-js#0.1.0"
```

# Usage

```
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
```
