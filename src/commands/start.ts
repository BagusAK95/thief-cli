import {Command} from '@oclif/command'
import {IProject} from '../interfaces/main';
import chalk from 'chalk'
import Helper from '../../src/class/helper'
const rp = require('request-promise')
const cheerio = require('cheerio')
const Table = require('cli-table')

export default class Start extends Command {
  private helper = new Helper()

  static description = 'start stealing data'

  async run() {
    const project:IProject = this.helper.loadYaml(`./${this.helper.getProp('project')}.yml`)

    const options = {
      uri: project.target.uri,
      timeout: project.target.timeout || 60000
    }
   
    rp(options)
      .then((html:any) => {
        cheerio(project.parent.selector, html).each((i:any, elem:any) => {
          this.log(`/* ${i + 1} */`)
          const table = new Table({
            head: [ 
              chalk.blueBright('Content'), 
              chalk.blueBright('Result'),
            ],
            colWidths: [10, 100]
          });

          project.childs.forEach(child => {
            if (child.attribute) {
              table.push([ child.content, cheerio(child.selector, elem).attr(child.attribute)])
            } else {
              table.push([ child.content, cheerio(child.selector, elem).text().trim()])
            }
          })

          this.log(table.toString())
        })
      })
      .catch((err:any) => {
          this.error(err)
      })
  }
}
