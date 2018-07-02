#!/usr/bin/env node
const Promise = require('bluebird')
const program = require('commander')
const inquirer = require('inquirer')
const { show, merge, parsePass } = require('guld-pass')
const { getName } = require('guld-user')
const { setupConfig } = require('guld-git-config')
const VERSION = require('./package.json').version
const HOSTS = {
  'bitbucket': {
    'url': 'bitbucket.org',
    'oauth-required': false
  },
  'github': {
    'url': 'github.com',
    'oauth-required': false
  },
  'gitlab': {
    'url': 'gitlab.com',
    'oauth-required': true
  }
}
const PROMPTS = [
  'What is your github username?',
  'What is your github password?',
  'What is your github personal oauth token? (optional)'
]

/* eslint-disable no-console */
program
  .name('guld-git-host')
  .description('Configuration manager for git hosts.')
  .version(VERSION)
  .option('-u --user <name>', 'The user name to run as.', (n) => {
    if (n) process.env.GULDNAME = global.GULDNAME = n
    return true
  })
program
  .command('init [hosts...]')
  .description('Initialize your git hosting account(s).')

program.parse(process.argv)

if (program.commands.map(c => c._name).indexOf(program.args[0]) !== -1) var cmd = program.args.shift()

async function inquireHost (hostname, user, hostuser, hostpass = '', hosttoken = '') {
  var answers = await inquirer.prompt([
    {
      name: 'config',
      type: 'confirm',
      message: `Do you want to configure ${hostname}?`
    }
  ])
  if (answers.config) return inquireHostName(hostname, user, hostuser, hostpass, hosttoken)
}

async function inquireHostName (hostname, user, hostuser, hostpass = '', hosttoken = '') {
  var answers = await inquirer.prompt([
    {
      name: 'username',
      type: 'input',
      message: PROMPTS[0].replace('github', hostname),
      default: user
    }
  ])
  answers.username = answers.username || user
  var conf = {}
  conf['host'] = {}
  conf['host'][hostname] = answers.username
  await setupConfig(conf)
  return inquireHostPass(hostname,
    user,
    answers.username,
    hostpass,
    hosttoken
  )
}

async function inquireHostPass (hostname, user, hostuser, hostpass = '', hosttoken = '') {
  var answers = await inquirer.prompt([
    {
      name: 'passphrase',
      type: 'password',
      message: PROMPTS[1].replace('github', hostname),
      default: hostpass
    }
  ])
  return inquireHostToken(
    hostname,
    user,
    hostuser,
    answers.passphrase || hostpass,
    hosttoken
  )
}

async function inquireHostToken (hostname, user, hostuser, hostpass, hosttoken = '') {
  var prompt = PROMPTS[2].replace('github', hostname)
  if (HOSTS[hostname]['oauth-required']) prompt = `${prompt}`.replace('optional', 'required')
  var answers = await inquirer.prompt([
    {
      name: 'oauthtoken',
      type: 'password',
      message: prompt,
      default: hosttoken
    }
  ])
  answers.oauthtoken = answers.oauthtoken || hosttoken
  var conf = {
    'password': hostpass,
    'login': hostuser,
    'url': HOSTS[hostname].url
  }
  if (answers.oauthtoken) conf['oauth'] = answers.oauthtoken
  console.log(await merge(`${user}/git/${hostname}`, conf))
}

async function loadCreds (hostname, user) {
  user = user || await getName()
  var creds = await show(`${user}/git/${hostname}`)
  if (creds) {
    var pass = parsePass(creds)
    var hostuser = pass.login || user
    var hostpass = pass.password || ''
    var hosttoken = pass.oauth || ''
    return inquireHost(hostname, user, hostuser, hostpass, hosttoken)
  } else return inquireHost(hostname, user)
}

async function initHosts (hosts) {
  return loadCreds(hosts)
}

switch (cmd) {
  case 'init':
  default:
    var hosts
    if (program.rawArgs.length > 3) hosts = program.rawArgs.slice(3)
    else hosts = Object.keys(HOSTS)
    Promise.each(hosts, initHosts)
    break
}
/* eslint-enable no-console */
