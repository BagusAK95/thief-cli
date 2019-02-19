import {Command} from '@oclif/command'
import Helper from '../class/helper';
import chalk from 'chalk'
const Table = require('cli-table')
const fs = require('fs')

export default class ListTarget extends Command {
  private helper = new Helper()

  static description = 'your target list'

  async run() {
    const targets = this.helper.getChoises()
    if (targets.length > 0) {
      const table = new Table({
        head: [ 
          chalk.blueBright('Target Name'), 
          chalk.blueBright('Description'),
        ],
        colWidths: [15, 100]
      });

      targets.forEach(target => {
        const load = this.helper.loadYaml(`./${target.name}.yml`)
        table.push([ target.name, load.description ])
      })

      this.log(table.toString())
    } else {
      
    }
  }
}
