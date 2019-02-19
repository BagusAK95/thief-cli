import {Command} from '@oclif/command'
import {IProject} from '../interfaces/main';
import Helper from '../../src/class/helper'
import cli from 'cli-ux'

export default class Init extends Command {
  private helper = new Helper()

  static description = 'set up new project'
  static args = [{name: 'projectName'}]

  async run() {
    const {args} = this.parse(Init)
    const desc = await cli.prompt('Description:')

    if (args.projectName) {
      const template:IProject = {
        description: desc,
        target: {
          uri: '',
        },
        parent: {
          selector: '',
        },
        childs: [
          {
            content: '',
            selector: '',
          },
        ]
      }
  
      this.helper.dumpYaml(`./${args.projectName}.yml`, template)
      this.log(`Successfully`)
    } else {
      this.error('projectName is required')
    }
  }
}
