import {Command, flags} from '@oclif/command'
import Helper from '../../src/class/helper'
import cli from 'cli-ux'
const inquirer = require('inquirer')
const fs = require('fs')

export default class SelectProject extends Command {
  private helper = new Helper()

  static description = 'delete your project'

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
      
      this.confirm(responses.project)
    } else {
      const choice = choices.filter(function (obj) {
        return obj.name == project;
      })

      if (choice.length) {
        this.confirm(project)
      } else {
        this.error(`Project Not found`)
      }
    }
  }

  async confirm(project:string) {
    const yes = await cli.confirm('Are you sure ?')
    if (yes) {
      fs.unlink(`./${project}.yml`, (err:any) => {
        this.log(`Successfully`)
      })
    }
  }
}
