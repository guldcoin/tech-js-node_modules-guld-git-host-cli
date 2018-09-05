# guld-git-host-cli

[![source](https://img.shields.io/badge/source-bitbucket-blue.svg)](https://bitbucket.org/guld/tech-js-node_modules-guld-git-host-cli) [![issues](https://img.shields.io/badge/issues-bitbucket-yellow.svg)](https://bitbucket.org/guld/tech-js-node_modules-guld-git-host-cli/issues) [![documentation](https://img.shields.io/badge/docs-guld.tech-green.svg)](https://guld.tech/cli/guld-git-host-cli.html)

[![node package manager](https://img.shields.io/npm/v/guld-git-host-cli.svg)](https://www.npmjs.com/package/guld-git-host-cli) [![travis-ci](https://travis-ci.org/guldcoin/tech-js-node_modules-guld-git-host-cli.svg)](https://travis-ci.org/guldcoin/tech-js-node_modules-guld-git-host-cli?branch=guld) [![lgtm](https://img.shields.io/lgtm/grade/javascript/b/guld/tech-js-node_modules-guld-git-host-cli.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/b/guld/tech-js-node_modules-guld-git-host-cli/context:javascript) [![david-dm](https://david-dm.org/guldcoin/tech-js-node_modules-guld-git-host-cli/status.svg)](https://david-dm.org/guldcoin/tech-js-node_modules-guld-git-host-cli) [![david-dm](https://david-dm.org/guldcoin/tech-js-node_modules-guld-git-host-cli/dev-status.svg)](https://david-dm.org/guldcoin/tech-js-node_modules-guld-git-host-cli?type=dev)

Configuration manager for git hosts.

### Install

##### Node

```sh
npm i -g guld-git-host-cli
```

### Usage

##### CLI

```sh
guld-git-host --help

  Usage: guld-git-host [options] [command]

  Configuration manager for git hosts.

  Options:

    -V, --version                 output the version number
    -u --user <name>              The user name to run as.
    -h, --help                    output usage information

  Commands:

    init [hosts...]               Initialize your git hosting account(s).
    repo-create [options] [name]  Create a repository. Defaults to the current working dir.
    repo-delete [name]            Delete a repository. Defaults to the current working dir.
    add-ssh [key]                 Add an ssh key to your git hosting account(s). Default: ~/.ssh/id_rsa.pub

```

### License

MIT Copyright isysd
