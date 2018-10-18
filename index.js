'use strict';

/* requirements */
const fs = require('fs');
const replace = require('replace');
const shjs = require('shelljs');

let lightjs = {};

/* command section */
let npmIsDefault = false;

function command(npmIsDefault) {
  return npmIsDefault ? 'npm' : 'yarn';
}

function exec(cmd, args, fail = true) {
  let cmdOnly = arguments.length === 1;
  info('run ' + (cmdOnly ? `'${cmd}'` : `'${cmd} ${args}'`));
  if (shjs.which(cmd)) {
    shjs.exec(cmdOnly ? cmd : `${cmd} ${args}`);
  } else {
    exit(cmd, fail);
  }
}

function exit(bin, fail) {
  if (fail) {
    error(`Sorry, this script requires '${bin}'.`);
    shjs.exit(1);
  } else {
    warn(`This script requires '${bin}' but it keeps going.`);
  }
}

function yarnpm(args) {
  let cmdOnly = arguments.length === 0;
  let cmd = command(npmIsDefault);
  let exec = cmdOnly ? cmd : `${cmd} ${args}`;
  info(`run '${exec}'`);
  if (shjs.which(cmd)) {
    shjs.exec(exec);
  } else {
    let checkCmd = this.command(!npmIsDefault);
    exec = cmdOnly ? checkCommand : `${checkCmd} ${args}`;
    warn(`command '${cmd}' not found, try to run '${checkCmd}'...`);
    info(`run '${exec}'`);
    if (shjs.which(checkCmd)) {
      shjs.exec(exec);
    } else {
      exit(checkCmd, true);
    }
  }
}

lightjs.exec = exec;
lightjs.yarnpm = yarnpm;

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

lightjs.error = error;
lightjs.info = info;
lightjs.success = success;
lightjs.warn = warn;

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

function replacement(regex, replacement, path, siltent = true, recursive = false) {
  replace({ regex: regex, replacement: replacement, path: path, silent: siltent, recursive: recursive });
}

lightjs.readJson = readJson;
lightjs.replacement = replacement;
lightjs.writeJson = writeJson;
lightjs.writeFile = writeFile;

module.exports = lightjs;
