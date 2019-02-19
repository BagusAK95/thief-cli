import {Command, flags} from '@oclif/command'
import Helper from '../class/helper'
import cli from 'cli-ux'
const inquirer = require('inquirer')
const fs = require('fs')

export default class SelectTarget extends Command {
  private helper = new Helper()

  static description = 'delete your target'

  static flags = {
    name: flags.string()
  }

  async run() {
    const {flags} = this.parse(SelectTarget)
    const choices = this.helper.getChoises()

    const target = flags.name
    if (!target) {
      const responses: any = await inquirer.prompt([{
        name: 'target',
        message: 'Select a target',
        type: 'list',
        choices: choices,
      }])
      
      this.confirm(responses.target)
    } else {
      const choice = choices.filter(function (obj) {
        return obj.name == target;
      })

      if (choice.length) {
        this.confirm(target)
      } else {
        this.error(`Target Not found`)
      }
    }
  }

  async confirm(target:string) {
    const yes = await cli.confirm('Are you sure ? (Y/N)')
    if (yes) {
      fs.unlink(`./${target}.yml`, (err:any) => {
        this.log(`Successfully`)
      })
    }
  }
}
