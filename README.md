# About this - light-js
[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)
[![dependencies Status](https://david-dm.org/inpercima/swaaplate-tools/status.svg)](https://david-dm.org/inpercima/swaaplate-tools)
[![devDependencies Status](https://david-dm.org/inpercima/swaaplate-tools/dev-status.svg)](https://david-dm.org/inpercima/swaaplate-tools?type=dev)

Simple utils working with fs, [shelljs](https://github.com/shelljs/shelljs) and [colors](https://github.com/Marak/colors.js).

# Prerequisites
## Node, npm or yarn
* `node 8.11.3` or higher in combination with
  * `npm 5.6.0` or higher or
  * `yarn 1.7.0` or higher, used in this repository

# Getting started

```
# add to package.json
"light-js": "inpercima/light-js#0.1.1"

# define a constant in your js file
const lightjs = require('light-js');
```

# API
## Table of contents
* [error(message)](#errormessage)
* [info(message)](#infomessage)
* [success(message)](#successmessage)
* [warn(message)](#warnmessage)
* [yarnpm(arguments)](#yarnpmarguments)
* [exec(command, [arguments, [fail]])](#execcommand-arguments-fail)
* [readJson(filename)](#readjsonfilename)
* [writeJson(filename, data)](#writejsonfilename-data)
* [writeFile(filename, data)](#writefilefilename-data)

## `error(message)`
Logs an error message.
* `message` an error message

```javascript
lightjs.error('an error message');
```

## `info(message)`
Logs an info message.
* `message` an info message

```javascript
lightjs.info('an info message');
```

## `success(message)`
Logs a success message.
* `message` a success message

```javascript
lightjs.success('a success message');
```

## `warn(message)`
Logs a warn message.
* `message` a warn message

```javascript
lightjs.warn('a warn message');
```

## `yarnpm(arguments)`
Run yarn or npm. It depends on what is installed on your system. Currently default is npm. Is it not installed, yarn will be run.
If non of both is installed, an error message appears.
This method will pass all arguments to the package manager and do not check if the arguments exists in the specified package manager.
* `arguments` everything what can run in yarn or npm

```javascript
lightjs.yarnpm('-v');
lightjs.yarnpm('run build');
```

## `exec(command, [arguments, [fail]])`
Run a command with arguments. You can specify if the script should fail if the command does not exist.
* `command` a command to run
* `arguments` everything what can run in the specify command
  * optional
* `fail` true if the scripts should fail otherwise false
  * optional
  * default: true

```javascript
lightjs.exec('docker', '-v', false);
lightjs.exec('yarn', '-v', false);

lightjs.exec('not-existing-command', 'arguments', false);

lightjs.exec('another-not-existing-command', 'arguments');
```

## `readJson(filename)`
Reads a json file and parse it as json.
* `filename` the filename

```javascript
lightjs.readJson('path/to/file.json');
```

## `writeJson(filename, data)`
Writes a json file.
* `filename` the filename to save
* `data` the object as json

```javascript
lightjs.writeJson('path/to/file.json', { "key": "value" });
```

## `writeFile(filename, data)`
Writes a simple file.
* `filename` the filename to save
* `data` the data to save

```javascript
lightjs.writeFile('path/to/file', 'a simple text file');
```
