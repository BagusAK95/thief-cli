import {Command, flags} from '@oclif/command'
import Helper from '../class/helper'
const inquirer = require('inquirer')

export default class SelectTarget extends Command {
  private helper = new Helper()

  static description = 'select your target'

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
      
      this.log(`Successfully`)
      this.helper.setProp('target', responses.target)
    } else {
      const choice = choices.filter(function (obj) {
        return obj.name == target;
      })

      if (choice.length) { 
        this.log(`Successfully`)
        this.helper.setProp('target', target)
      } else {
        this.error(`Target not found`)
      }
    }
  }
}