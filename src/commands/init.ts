import {Command} from '@oclif/command'
import {ITarget} from '../interface';
import Helper from '../helper'
import cli from 'cli-ux'

export default class Init extends Command {
  private helper = new Helper()

  static description = 'set up new target'
  static args = [{name: 'targetName'}]

  async run() {
    const {args} = this.parse(Init)
    const desc = await cli.prompt('Description')

    if (args.targetName) {
      const template:ITarget = {
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
  
      this.helper.dumpYaml(`./${args.targetName}.yml`, template)
      this.log(`Successfully`)
    } else {
      this.error('targetName is required')
    }
  }
}
