# guld-git-host-cli

Configuration manager for git hosts.

### Install

```
npm i -g guld-git-host-cli
```

### Usage

##### CLI

```
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
