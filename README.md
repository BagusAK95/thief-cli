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
* [`thief init [Project Name]`](#thief-init)
* [`thief list-project`](#thief-list-project)
* [`thief select-project`](#thief-select-project)
* [`thief current-project`](#thief-current-project)
* [`thief delete-project`](#thief-delete-project)
* [`thief start`](#thief-start)
* [`thief test`](#thief-test)

## `thief init [Project Name]`

Set up new project

```
USAGE
  $ thief init [Project Name]
```

_See code: [src/commands/init.ts](https://github.com/BagusAK95/thief-cli/blob/v0.0.1/src/commands/init.ts)_

## `thief list-project`

Your project list

```
USAGE
  $ thief list-project
```

_See code: [src/commands/list-project.ts](https://github.com/BagusAK95/thief-cli/blob/v0.0.1/src/commands/list-project.ts)_

## `thief select-project`

Select your project

```
USAGE
  $ thief select-project

OPTIONS
  --name=Project Name
```

_See code: [src/commands/select-project.ts](https://github.com/BagusAK95/thief-cli/blob/v0.0.1/src/commands/select-project.ts)_

## `thief current-project`

Your active project

```
USAGE
  $ thief current-project
```

_See code: [src/commands/current-project.ts](https://github.com/BagusAK95/thief-cli/blob/v0.0.1/src/commands/current-project.ts)_

## `thief delete-project`

Delete your project

```
USAGE
  $ thief delete-project

OPTIONS
  --name=Project Name
```

_See code: [src/commands/delete-project.ts](https://github.com/BagusAK95/thief-cli/blob/v0.0.1/src/commands/delete-project.ts)_

## `thief start`

Start stealing data

```
USAGE
  $ thief start
```

_See code: [src/commands/start.ts](https://github.com/BagusAK95/thief-cli/blob/v0.0.1/src/commands/start.ts)_

## `thief test`

Test stealing data

```
USAGE
  $ thief test
```

_See code: [src/commands/test.ts](https://github.com/BagusAK95/thief-cli/blob/v0.0.1/src/commands/test.ts)_

<!-- commandsstop -->
