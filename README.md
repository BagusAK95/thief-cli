thief-cli
=========



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/thief-cli.svg)](https://npmjs.org/package/thief-cli)
[![Downloads/week](https://img.shields.io/npm/dw/thief-cli.svg)](https://npmjs.org/package/thief-cli)
[![License](https://img.shields.io/npm/l/thief-cli.svg)](https://github.com/BagusAK95/thief-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g thief-cli
$ thief COMMAND
running command...
$ thief (-v|--version|version)
thief-cli/0.0.1 darwin-x64 node-v8.14.0
$ thief --help [COMMAND]
USAGE
  $ thief COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`thief init [Project Name]`](#thief-init-projectname)
* [`thief list-project`](#thief-list-project-file)
* [`thief select-project`](#thief-select-project)
* [`thief current-project`](#thief-current-project-file)
* [`thief delete-project`](#thief-delete-project-file)
* [`thief start`](#thief-start)
* [`thief test`](#thief-test-file)
* [`thief help`](#thief-help-command)

## `thief init [Project Name]`

set up new project

```
USAGE
  $ thief init [Project Name]
```

_See code: [src/commands/init.ts](https://github.com/BagusAK95/thief-cli/blob/v0.0.1/src/commands/init.ts)_

## `thief list-project`

your project list

```
USAGE
  $ thief list-project
```

_See code: [src/commands/list-project.ts](https://github.com/BagusAK95/thief-cli/blob/v0.0.1/src/commands/list-project.ts)_

## `thief select-project`

select your project

```
USAGE
  $ thief select-project

OPTIONS
  --name=Project Name
```

_See code: [src/commands/select-project.ts](https://github.com/BagusAK95/thief-cli/blob/v0.0.1/src/commands/select-project.ts)_

## `thief current-project`

your active project

```
USAGE
  $ thief current-project
```

_See code: [src/commands/current-project.ts](https://github.com/BagusAK95/thief-cli/blob/v0.0.1/src/commands/current-project.ts)_

## `thief delete-project`

describe the command here

```
USAGE
  $ thief delete-project

OPTIONS
  --name=Project Name
```

_See code: [src/commands/delete-project.ts](https://github.com/BagusAK95/thief-cli/blob/v0.0.1/src/commands/delete-project.ts)_

## `thief start`

start stealing data

```
USAGE
  $ thief start
```

_See code: [src/commands/start.ts](https://github.com/BagusAK95/thief-cli/blob/v0.0.1/src/commands/start.ts)_

## `thief test`

test stealing data

```
USAGE
  $ thief test
```

_See code: [src/commands/test.ts](https://github.com/BagusAK95/thief-cli/blob/v0.0.1/src/commands/test.ts)_

## `thief help [COMMAND]`

display help for thief

```
USAGE
  $ thief help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

<!-- commandsstop -->
