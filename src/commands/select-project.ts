import {Command, flags} from '@oclif/command'
import Helper from '../../src/class/helper'
const inquirer = require('inquirer')

export default class SelectProject extends Command {
  private helper = new Helper()

  static description = 'select your project'

  static flags = {
    name: flags.string()
  }

  async run() {
    const {flags} = this.parse(SelectProject)
    const choices = this.helper.getChoises()

    const project = flags.name
    if (!project) {
      const responses: any = await inquirer.prompt([{
        name: 'project',
        message: 'Select a project',
        type: 'list',
        choices: choices,
      }])
      
      this.log(`Successfully`)
      this.helper.setProp('project', responses.project)
    } else {
      const choice = choices.filter(function (obj) {
        return obj.name == project;
      })

      if (choice.length) { 
        this.log(`Successfully`)
        this.helper.setProp('project', project)
      } else {
        this.error(`Project not found`)
      }
    }
  }
}
