'use strict';

/* requirements */
const colors = require('colors');
const fs = require('fs');
const shjs = require('shelljs');

let lightJs = {};

/* command section */
let npmIsDefault = false;

function command(npmIsDefault) {
  return npmIsDefault ? 'npm' : 'yarn';
}

function exec(cmd, options, fail = true) {
  let cmdOnly = arguments.length === 1;
  info('run ' + (cmdOnly ? `'${cmd}'` : `'${cmd} ${options}'`));
  if (shjs.which(cmd)) {
    shjs.exec(cmdOnly ? cmd : `${cmd} ${options}`);
  } else {
    exit(cmd, fail);
  }
}

function exit(bin, fail) {
  if (fail) {
    error(`Sorry, this script requires '${bin}'.`);
    exit(1);
  } else {
    warn(`This script requires '${bin}' but it keeps going.`);
  }
}

function yarnpm(options) {
  let cmdOnly = arguments.length === 0;
  let cmd = command(npmIsDefault);
  let exec = cmdOnly ? cmd : `${cmd} ${options}`;
  info(`run '${exec}'`);
  if (shjs.which(cmd)) {
    shjs.exec(exec);
  } else {
    let checkCmd = this.command(!npmIsDefault);
    exec = cmdOnly ? checkCommand : `${checkCmd} ${options}`;
    warn(`command '${cmd}' not found, try to run '${checkCmd}'...`);
    info(`run '${exec}'`);
    if (shjs.which(checkCmd)) {
      shjs.exec(exec);
    } else {
      exit(checkCmd, true);
    }
  }
}

lightJs.exec = exec;
lightJs.yarnpm = yarnpm;

/* logging section */
function error(value) {
  shjs.echo(`[ERROR  ] ${value}`.red.bold);
}

function info(value) {
  shjs.echo(`[INFO   ] ${value}`.blue);
}

function success(value) {
  shjs.echo(`[SUCCESS] ${value}`.green);
}

function warn(value) {
  shjs.echo(`[WARN   ] ${value}`.yellow);
}

lightJs.error = error;
lightJs.info = info;
lightJs.success = success;
lightJs.warn = warn;

/* file section */
function readJson(filename) {
  return JSON.parse(fs.readFileSync(filename));
}

function writeJson(filename, data) {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

function writeFile(filename, data) {
  fs.writeFileSync(filename, data);
}

lightJs.readJson = readJson;
lightJs.writeJson = writeJson;
lightJs.writeJson = writeJson;

module.exports = lightJs;