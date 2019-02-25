Thief CLI
=========

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/thief-cli.svg)](https://npmjs.org/package/thief-cli)
[![Downloads/week](https://img.shields.io/npm/dw/thief-cli.svg)](https://npmjs.org/package/thief-cli)
[![License](https://img.shields.io/npm/l/thief-cli.svg)](https://github.com/BagusAK95/thief-cli/blob/master/package.json)

<!-- toc -->
* [Introduction](#introduction)
* [Installation](#installation)
* [Commands](#commands)
* [Documentation of Yaml Configuration](https://github.com/BagusAK95/thief-cli-docs/blob/master/README.md)
* [Examples](https://github.com/BagusAK95/thief-cli-docs/tree/master/examples)
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

## thief version

Get current version

```
USAGE
  $ thief (-v|--version|version)

OUTPUT
  thief-cli/0.0.1 darwin-x64 node-v8.14.0
```

## thief update

Upgrade to last version

```
USAGE
  $ thief update
```

## thief init [Target Name]

Set up new target

```
USAGE
  $ thief init my-target-3

OUTPUT
  Description: this is for description
```

This command will generate a `my-target-3.yml`

## thief list-target

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

## thief select-target

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

## thief current-target

Your active target

```
USAGE
  $ thief current-target

OUTPUT
  Your active target is my-target-1
```

## thief delete-target

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

## thief test

Test stealing data

```
USAGE
  $ thief test

OUTPUT
  Try to stealing https://demo.website.com/

  ┌───────────────┬────────────────────────────────────────────────────────────────────────────────────┐
  │ Content       │ Result                                                                             │
  ├───────────────┼────────────────────────────────────────────────────────────────────────────────────┤
  │ my-content-1  │ this is for result                                                                 │
  ├───────────────┼────────────────────────────────────────────────────────────────────────────────────┤
  │ my-content-2  │ this is for result                                                                 │
  ├───────────────┼────────────────────────────────────────────────────────────────────────────────────┤
  │ my-content-3  │ this is for result                                                                 │
  └───────────────┴────────────────────────────────────────────────────────────────────────────────────┘
  ┌───────────────┬────────────────────────────────────────────────────────────────────────────────────┐
  │ Content       │ Result                                                                             │
  ├───────────────┼────────────────────────────────────────────────────────────────────────────────────┤
  │ my-content-1  │ this is for result                                                                 │
  ...
```

## thief start

Start stealing data

```
USAGE
  $ thief start
OUTPUT
  Try to stealing https://demo.website.com/1... done
  Try to stealing https://demo.website.com/2... done
  Try to stealing https://demo.website.com/3... ⣻
```

<!-- commandsstop -->
