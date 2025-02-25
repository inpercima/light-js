# light-js

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)
![Release Version](https://img.shields.io/github/v/release/inpercima/light-js)
[![Node CI](https://github.com/inpercima/light-js/actions/workflows/ci.yml/badge.svg)](https://github.com/inpercima/light-js/actions/workflows/ci.yml)

Simple utils working with fs, [shelljs](https://github.com/shelljs/shelljs) and [replace](https://github.com/ALMaclaine/replace).

## Prerequisites

### Node, npm or pnpm

* `node 22.14.0` or higher in combination with
  * `npm 10.9.2` or higher or
  * `pnpm 10.4.2` or higher, used in this repository

## Getting started

```bash
# clone project
git clone https://github.com/inpercima/light-js.git
cd light-js
```

## Usage

```bash
# test
pnpm test
```

## Install

```json
# add light-js to your project, mostly in package.json and install with your preferred package manager
"light-js": "inpercima/light-js#1.1.7"

# define a constant in your js file
const lightjs = require('light-js');
```

## API

### Table of contents

* [error(message)](#errormessage)
* [info(message)](#infomessage)
* [success(message)](#successmessage)
* [warn(message)](#warnmessage)
* [yarnpm(arguments)](#yarnpmarguments)
* [exec(command [, arguments] [, fail])](#execcommand--arguments--fail)
* [readJson(filename)](#readjsonfilename)
* [replacement(regex, replacement, paths [, silent] [, recursive] [, exclude])](#replacementregex-replacement-paths--silent--recursive--exclude)
* [writeJson(filename, data)](#writejsonfilename-data)
* [writeFile(filename, data)](#writefilefilename-data)

### `error(message)`

Logs an error message.

* `message` an error message

```javascript
lightjs.error('an error message');
```

### `info(message)`

Logs an info message.

* `message` an info message

```javascript
lightjs.info('an info message');
```

### `success(message)`

Logs a success message.

* `message` a success message

```javascript
lightjs.success('a success message');
```

### `warn(message)`

Logs a warn message.

* `message` a warn message

```javascript
lightjs.warn('a warn message');
```

### `yarnpm(arguments)`

Run yarn or npm.
It depends on what is installed on your system.
Currently default is npm.
Is it not installed, yarn will be run.
If non of both is installed, an error message appears.
This method will pass all arguments to the package manager and do not check if the arguments exists in the specified package manager.

* `arguments` everything what can run in yarn or npm

```javascript
lightjs.yarnpm('-v');
lightjs.yarnpm('run build');
```

### `exec(command [, arguments] [, fail])`

Run a command with arguments.
You can specify if the script should fail if the command does not exist.

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

### `readJson(filename)`

Reads a json file and parse it as json.

* `filename` the filename

```javascript
lightjs.readJson('path/to/file.json');
```

### `replacement(regex, replacement, paths [, silent] [, recursive] [, exclude])`

Replaces a string or a regex in specific files, recursive or not with silent mode if desired.

* `regex` a simple string or regex
* `replacement` string for replace
* `paths` paths as an array for replacement
* `silent` true if no output should be done otherwise false
  * optional
  * default: true
* `recursive` true if the replacement should be recursive otherwise false
  * optional
  * default: false
* `exclude` comma separated string of excludes dirs or files
  * optional
  * default: ''

```javascript
lightjs.replacement('loginForm', `anotherForm`, ['path/to/file']);
lightjs.replacement('loginForm', `anotherForm`, ['path/to/dir'], false });
lightjs.replacement('loginForm', `anotherForm`, ['path/to/dir1', 'path/to/dir2'], false, true);
lightjs.replacement('loginForm', `anotherForm`, ['path/to/dir1', 'path/to/dir2'], false, true, 'node_modules');
```

### `writeJson(filename, data)`

Writes a json file.

* `filename` the filename to save
* `data` the object as json

```javascript
lightjs.writeJson('path/to/file.json', { "key": "value" });
```

### `writeFile(filename, data)`

Writes a simple file.

* `filename` the filename to save
* `data` the data to save

```javascript
lightjs.writeFile('path/to/file', 'a simple text file');
```
