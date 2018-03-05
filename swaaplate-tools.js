'use strict';

/* requirements */
const colors = require('colors');
const fs = require('fs');
const shjs = require('shelljs');

/* module */
module.exports = {
  // run section
  command: function(npmIsDefault) {
    return npmIsDefault ? 'npm' : 'yarn';
  },
  exec: function(command, options, fail = true) {
    let commandOnly = arguments.length === 1;
    this.info('run ' + (commandOnly ? `'${command}'` : `'${command} ${options}'`));
    if (shjs.which(command)) {
      shjs.exec(commandOnly ? command : `${command} ${options}`);
    } else {
      this.exit(command, fail);
    }
  },
  exit: function(bin, fail) {
    if (fail) {
      this.error(`Sorry, this script requires '${bin}'.`);
      shjs.exit(1);
    } else {
      this.warn(`This script requires '${bin}' but it keeps going.`);
    }
  },
  npmIsDefault: false,
  yarnpm: function(options) {
    let commandOnly = arguments.length === 0;
    let command = this.command(this.npmIsDefault);
    let exec = commandOnly ? command : `${command} ${options}`;
    this.info(`run '${exec}'`);
    if (shjs.which(command)) {
      shjs.exec(exec);
    } else {
      let checkCommand = this.command(!this.npmIsDefault);
      exec = commandOnly ? checkCommand : `${checkCommand} ${options}`;
      this.warn(`command '${command}' not found, try to run '${checkCommand}'...`);
      this.info(`run '${exec}'`);
      if (shjs.which(checkCommand)) {
        shjs.exec(exec);
      } else {
        this.exit(checkCommand, true);
      }
    }
  },
  // log section
  error: function(value) {
    shjs.echo(`[ERROR  ] ${value}`.red.bold);
  },
  info: function (value) {
    shjs.echo(`[INFO   ] ${value}`.blue);
  },
  success: function (value,) {
    shjs.echo(`[SUCCESS] ${value}`.green);
  },
  warn: function (value,) {
    shjs.echo(`[WARN   ] ${value}`.yellow);
  },
  // json section
  readJson: function(filename) {
    return JSON.parse(fs.readFileSync(filename));
  },
  writeJson: function(filename, data) {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  },
  // file section
  writeFile: function(filename, data) {
    fs.writeFileSync(filename, data);
  }
}
