import {Command} from '@oclif/command'
import {IProject} from '../interfaces/main';
import {cli} from 'cli-ux';
import chalk from 'chalk'
import Helper from '../../src/class/helper'
const rp = require('request-promise')
const cheerio = require('cheerio')
const Table = require('cli-table')

export default class Test extends Command {
  private helper = new Helper()

  static description = 'test stealing data'

  async run(uri?:string) {
    cli.action.stop()

    const project:IProject = this.helper.loadYaml(`./${this.helper.getProp('project')}.yml`)
    if (uri) project.target.uri = uri
    
    this.log(`\nTry to stealing ${project.target.uri}\n`)
    switch (project.scrapingMode) {
      case "toDetail":
        this.stealingToDetail(project).then((html) => {
          if (project.nextPage) {
            const next = cheerio(project.nextPage.selector, html).attr(project.nextPage.attribute)
            if (next) {
              if (!project.interval) {
                this.run(next)
              } else {
                cli.action.start('Taking a break')
                this.helper.sleep(Number(project.interval)).then(() => {
                  this.run(next)
                })
              }
            }
          }
        })

        break;
      default:
        this.stealingThisPage(project).then((html) => {
          if (project.nextPage) {
            const next = cheerio(project.nextPage.selector, html).attr(project.nextPage.attribute)
            if (next) {
              if (!project.interval) {            
                this.run(next)
              } else {
                cli.action.start('Taking a break')
                this.helper.sleep(Number(project.interval)).then(() => {
                  this.run(next)
                })
              }
            }
          }
        })

        break;
    }
  }

  async stealingThisPage(project:IProject): Promise<{}> {
    return new Promise((resolve) => {
      rp(project.target).then((html:any) => {
        cheerio(project.parent.selector, html).each((i:any, elem:any) => {
          this.log(`/* ${i + 1} */`)
          const table = new Table({
            head: [
              chalk.blueBright('Content'), 
              chalk.blueBright('Result'),
            ],
            colWidths: [20, 100]
          });
  
          project.childs.forEach(child => {
            if (child.attribute) {
              table.push([ child.content, this.getAttribute(child.selector, child.attribute, elem) ])
            } else {
              table.push([ child.content, this.getText(child.selector, elem)])
            }
          })
  
          this.log(table.toString())
        })

        resolve(html)
      }).catch((err:any) => {
        this.error(err)
      })
    })
  }

  async stealingToDetail(project:IProject): Promise<{}> {
    return new Promise((resolve) => {
      rp(project.target).then(async (html:any) => {
        const result = cheerio(project.parent.selector, html)
        for (let i = 0; i < result.length; i++) {
          await this.promiseDetail(project, i, result[i])
        }

        resolve(html)
      }).catch((err:any) => {
        this.error(err)
      })
    })
  }

  processDetail(project:IProject, i:number, elem:any) : Promise<{}> {
    return new Promise((resolve) => {
      const table = new Table({
        head: [
          chalk.blueBright('Content'), 
          chalk.blueBright('Result'),
        ],
        colWidths: [20, 100]
      });

      if (project.parent.attribute) {
        table.push([ 'source', elem.attribs[project.parent.attribute] ])

        rp(elem.attribs[project.parent.attribute]).then((html:any) => {
          this.log(`/* ${i + 1} */`)
          
          project.childs.forEach(child => {
            if (child.attribute) {
              table.push([ child.content, this.getAttribute(child.selector, child.attribute, html) ])
            } else {
              table.push([ child.content, this.getText(child.selector, html)])
            }
          })
  
          this.log(table.toString())

          resolve(html)
        }).catch((err:any) => {
          this.error(err)
        })
      }
    })
  }
  
  async promiseDetail(project:IProject, i:number, item:any) {
    await this.processDetail(project, i, item)
  }

  private getText(selector: string, elm:any): string {
    const result = cheerio(selector, elm)
    if (result.length > 0) {
      return result.map((i:any, elm:any) => {
        return cheerio(elm).text().replace(/\s+/g,' ').trim()
      }).get().join(', ')
    } else {
      return ''
    }
  }

  private getAttribute(selector: string, attribute:string, elm:any): string {
    const result = cheerio(selector, elm)
    if (result.length > 0) {
      return result.map((i:any, elm:any) => {
        return cheerio(elm).attr(attribute).trim()
      }).get().join(', ')
    } else {
      return ''
    }
  }
}
