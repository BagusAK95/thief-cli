import {Command} from '@oclif/command'
import Helper from '../../src/class/helper'
import chalk from 'chalk';

export default class CurrentProject extends Command {
  private helper = new Helper()

  static description = 'your active project'

  async run() {
    const project = this.helper.getProp('project')
    if (project) {
      this.log(`Your active project is ${chalk.blueBright(project.toString())}`)
    } else {
      this.warn(`Please select your project first`)
    }
  }
}
