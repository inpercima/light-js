'use strict';

/* requirements */
const colors = require('colors');
const execa = require('execa');
const fs = require('node:fs');
const replaceInFile = require('replace-in-file');

const lightjs = {};

/* command section */
let isNpmDefault = false;

function setNpmDefault(npm) {
  isNpmDefault = npm;
}

function yarnpmCmd(isNpmDefault) {
  return isNpmDefault ? 'npm' : 'yarn';
}

function commandExists(cmd) {
  try {
    const which = process.platform === 'win32' ? 'where' : 'which';
    execa.sync(which, [cmd], { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

function exit(bin, fail) {
  if (fail) {
    error(`Sorry, this script requires '${bin}'.`);
    process.exit(1);
  } else {
    warn(`This script requires '${bin}' but it keeps going.`);
  }
}

function execFailed(cmdLine, fail) {
  if (fail) {
    error(`Command '${cmdLine}' failed.`);
    process.exit(1);
  } else {
    warn(`Command '${cmdLine}' failed but keeps going.`);
  }
}

function exec(cmd, args, fail = true) {
  const cmdOnly = arguments.length === 1;
  const cmdLine = cmdOnly ? cmd : `${cmd} ${args}`;
  info(`run '${cmdLine}'`);
  if (commandExists(cmd)) {
    try {
      execa.commandSync(cmdLine, { stdio: 'inherit' });
    } catch {
      execFailed(cmdLine, fail);
    }
  } else {
    exit(cmd, fail);
  }
}

async function execAsync(cmd, args, fail = true) {
  const cmdOnly = arguments.length === 1;
  const cmdLine = cmdOnly ? cmd : `${cmd} ${args}`;
  info(`run '${cmdLine}'`);
  if (commandExists(cmd)) {
    try {
      await execa.command(cmdLine, { stdio: 'inherit' });
    } catch {
      execFailed(cmdLine, fail);
    }
  } else {
    exit(cmd, fail);
  }
}

function yarnpm(args) {
  const cmdOnly = arguments.length === 0;
  const cmd = yarnpmCmd(isNpmDefault);
  const cmdLine = cmdOnly ? cmd : `${cmd} ${args}`;
  info(`run '${cmdLine}'`);
  if (commandExists(cmd)) {
    try {
      execa.commandSync(cmdLine, { stdio: 'inherit' });
    } catch {
      execFailed(cmdLine, true);
    }
  } else {
    const checkCmd = yarnpmCmd(!isNpmDefault);
    const checkCmdLine = cmdOnly ? checkCmd : `${checkCmd} ${args}`;
    warn(`command '${cmd}' not found, try to run '${checkCmd}'...`);
    info(`run '${checkCmdLine}'`);
    if (commandExists(checkCmd)) {
      try {
        execa.commandSync(checkCmdLine, { stdio: 'inherit' });
      } catch {
        execFailed(checkCmdLine, true);
      }
    } else {
      exit(checkCmd, true);
    }
  }
}

lightjs.exec = exec;
lightjs.execAsync = execAsync;
lightjs.setNpmDefault = setNpmDefault;
lightjs.yarnpm = yarnpm;

/* logging section */
function error(value) {
  console.log(`[ERROR  ] ${value}`.red.bold);
}

function info(value) {
  console.log(`[INFO   ] ${value}`.blue);
}

function success(value) {
  console.log(`[SUCCESS] ${value}`.green);
}

function warn(value) {
  console.log(`[WARN   ] ${value}`.yellow);
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

function replacement(regex, replacement, path) {
  replaceInFile.replaceInFileSync({ from: regex, to: replacement, files: path });
}

lightjs.readJson = readJson;
lightjs.replacement = replacement;
lightjs.writeJson = writeJson;
lightjs.writeFile = writeFile;

module.exports = lightjs;
