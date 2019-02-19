thief-cli
=========



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/thief-cli.svg)](https://npmjs.org/package/thief-cli)
[![Downloads/week](https://img.shields.io/npm/dw/thief-cli.svg)](https://npmjs.org/package/thief-cli)
[![License](https://img.shields.io/npm/l/thief-cli.svg)](https://github.com/BagusAK95/thief-cli/blob/master/package.json)

<!-- toc -->
* [Introduction](#introduction)
* [Installation](#installation)
* [Commands](#commands)
<!-- tocstop -->

# Introduction
<!-- introduction -->
Thief Command Line Interface (Thief CLI) is a tool for scraping website and manage data with command line/shell.
<!-- introductionstop -->

# Installation
<!-- installation -->
To install thief-cli in global mode, run this command in your terminal:
```
$ npm install -g thief-cli
```
This is the preferred method to install thief-cli, as it will always install the most recent stable release.
<!-- installationstop -->

# Commands
<!-- commands -->
* [`thief version`](#thief-version)
* [`thief update`](#thief-update)
* [`thief init [Target Name]`](#thief-init)
* [`thief list-target`](#thief-list-target)
* [`thief select-target`](#thief-select-target)
* [`thief current-target`](#thief-current-target)
* [`thief delete-target`](#thief-delete-target)
* [`thief test`](#thief-test)
* [`thief start`](#thief-start)

## `thief version`

Get version

```
USAGE
  $ thief (-v|--version|version)

OUTPUT
  thief-cli/0.0.1 darwin-x64 node-v8.14.0
```

## `thief update`

Update to last version

```
USAGE
  $ thief update
```

## `thief init [Target Name]`

Set up new target

```
USAGE
  $ thief init my-target-3

OUTPUT
  Description: this is for description
  Successfully
```

_See code: [src/commands/init.ts](https://github.com/BagusAK95/thief-cli/blob/v0.0.1/src/commands/init.ts)_

## `thief list-target`

Your target list

```
USAGE
  $ thief list-target

OUTPUT
  ┌───────────────┬────────────────────────────────────────────────────────────────────────────────────┐
  │ Target Name   │ Description                                                                        │
  ├───────────────┼────────────────────────────────────────────────────────────────────────────────────┤
  │ my-target-1   │ this is for description                                                            │
  ├───────────────┼────────────────────────────────────────────────────────────────────────────────────┤
  │ my-target-2   │ this is for description                                                            │
  ├───────────────┼────────────────────────────────────────────────────────────────────────────────────┤
  │ my-target-3   │ this is for description                                                            │
  └───────────────┴────────────────────────────────────────────────────────────────────────────────────┘
```

_See code: [src/commands/list-target.ts](https://github.com/BagusAK95/thief-cli/blob/v0.0.1/src/commands/list-target.ts)_

## `thief select-target`

Select your target

```
USAGE
  $ thief select-target

OPTIONS
  --name=Target Name

OUTPUT
  ? Select a target 
  ❯ my-target-1 
    my-target-2
    my-target-3
```

_See code: [src/commands/select-target.ts](https://github.com/BagusAK95/thief-cli/blob/v0.0.1/src/commands/select-target.ts)_

## `thief current-target`

Your active target

```
USAGE
  $ thief current-target

OUTPUT
  Your active target is my-target-1
```

_See code: [src/commands/current-target.ts](https://github.com/BagusAK95/thief-cli/blob/v0.0.1/src/commands/current-target.ts)_

## `thief delete-target`

Delete your target

```
USAGE
  $ thief delete-target

OPTIONS
  --name=Target Name

OUTPUT
  ? Select a target 
  ❯ my-target-1 
    my-target-2
    my-target-3
```

_See code: [src/commands/delete-target.ts](https://github.com/BagusAK95/thief-cli/blob/v0.0.1/src/commands/delete-target.ts)_

## `thief test`

Test stealing data

```
USAGE
  $ thief test

OUTPUT
  ┌───────────────┬────────────────────────────────────────────────────────────────────────────────────┐
  │ Content       │ Result                                                                             │
  ├───────────────┼────────────────────────────────────────────────────────────────────────────────────┤
  │ my-content-1  │ this is for result                                                                 │
  ├───────────────┼────────────────────────────────────────────────────────────────────────────────────┤
  │ my-content-2  │ this is for result                                                                 │
  ├───────────────┼────────────────────────────────────────────────────────────────────────────────────┤
  │ my-content-3  │ this is for result                                                                 │
  └───────────────┴────────────────────────────────────────────────────────────────────────────────────┘
```

_See code: [src/commands/test.ts](https://github.com/BagusAK95/thief-cli/blob/v0.0.1/src/commands/test.ts)_

## `thief start`

Start stealing data

```
USAGE
  $ thief start
```

_See code: [src/commands/start.ts](https://github.com/BagusAK95/thief-cli/blob/v0.0.1/src/commands/start.ts)_

<!-- commandsstop -->
