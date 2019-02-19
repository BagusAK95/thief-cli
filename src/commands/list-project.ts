import {Command} from '@oclif/command'
import Helper from '../class/helper';
import chalk from 'chalk'
const Table = require('cli-table')
const fs = require('fs')

export default class ListProject extends Command {
  private helper = new Helper()

  static description = 'your project list'

  async run() {
    const projects = this.helper.getChoises()
    if (projects.length > 0) {
      const table = new Table({
        head: [ 
          chalk.blueBright('Project Name'), 
          chalk.blueBright('Description'),
        ],
        colWidths: [15, 100]
      });

      projects.forEach(project => {
        const load = this.helper.loadYaml(`./${project.name}.yml`)
        table.push([ project.name, load.description ])
      })

      this.log(table.toString())
    } else {
      
    }
  }
}
