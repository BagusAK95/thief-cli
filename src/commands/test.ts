import {Command} from '@oclif/command'
import {ITarget} from '../interface';
import {cli} from 'cli-ux';
import chalk from 'chalk'
import Helper from '../helper'
const rp = require('request-promise')
const cheerio = require('cheerio')
const Table = require('cli-table')

export default class Test extends Command {
  private helper = new Helper()

  static description = 'test stealing data'

  async run(uri?:string) {
    cli.action.stop()

    const target:ITarget = this.helper.loadYaml(`./${this.helper.getProp('target')}.yml`)
    if (uri) target.target.uri = uri
    
    this.log(`\nTry to stealing ${target.target.uri}\n`)
    switch (target.scrapingMode) {
      case "toDetail":
        this.stealingToDetail(target).then((html) => {
          if (target.nextPage) {
            const next = cheerio(target.nextPage.selector, html).attr(target.nextPage.attribute)
            if (next) {
              if (!target.interval) {
                this.run(next)
              } else {
                cli.action.start('Taking a break')
                this.helper.sleep(Number(target.interval)).then(() => {
                  this.run(next)
                })
              }
            }
          }
        })

        break;
      default:
        this.stealingThisPage(target).then((html) => {
          if (target.nextPage) {
            const next = cheerio(target.nextPage.selector, html).attr(target.nextPage.attribute)
            if (next) {
              if (!target.interval) {            
                this.run(next)
              } else {
                cli.action.start('Taking a break')
                this.helper.sleep(Number(target.interval)).then(() => {
                  this.run(next)
                })
              }
            }
          }
        })

        break;
    }
  }

  async stealingThisPage(target:ITarget): Promise<{}> {
    return new Promise((resolve) => {
      rp(target.target).then((html:any) => {
        cheerio(target.parent.selector, html).each((i:any, elem:any) => {
          this.log(`/* ${i + 1} */`)
          const table = new Table({
            head: [
              chalk.blueBright('Content'), 
              chalk.blueBright('Result'),
            ],
            colWidths: [20, 100]
          });
  
          target.childs.forEach(child => {
            if (child.attribute) {
              table.push([ child.content, this.getAttribute(child.selector, child.attribute, elem, child.regex, child.group) ])
            } else {
              table.push([ child.content, this.getText(child.selector, elem, child.regex, child.group)])
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

  async stealingToDetail(target:ITarget): Promise<{}> {
    return new Promise((resolve) => {
      rp(target.target).then(async (html:any) => {
        const result = cheerio(target.parent.selector, html)
        for (let i = 0; i < result.length; i++) {
          await this.promiseDetail(target, i, result[i])
        }

        resolve(html)
      }).catch((err:any) => {
        this.error(err)
      })
    })
  }

  processDetail(target:ITarget, i:number, elem:any) : Promise<{}> {
    return new Promise((resolve) => {
      const table = new Table({
        head: [
          chalk.blueBright('Content'), 
          chalk.blueBright('Result'),
        ],
        colWidths: [20, 100]
      });

      if (target.parent.attribute) {
        table.push([ 'source', elem.attribs[target.parent.attribute] ])

        rp(elem.attribs[target.parent.attribute]).then((html:any) => {
          this.log(`/* ${i + 1} */`)
          
          target.childs.forEach(child => {
            if (child.attribute) {
              table.push([ child.content, this.getAttribute(child.selector, child.attribute, html, child.regex, child.group) ])
            } else {
              table.push([ child.content, this.getText(child.selector, html, child.regex, child.group)])
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
  
  async promiseDetail(target:ITarget, i:number, item:any) {
    await this.processDetail(target, i, item)
  }

  private getText(selector: string, elm:any, regex?:RegExp, group?:number): string {
    const result = cheerio(selector, elm)
    if (result.length > 0) {
      const text = result.map((i:any, elm:any) => {
        return cheerio(elm).text().replace(/\s+/g,' ').trim()
      }).get().join(', ')

      if (regex) {
        return this.helper.getRegex(regex, text, group)
      } else {
        return text
      }
    } else {
      return ''
    }
  }

  private getAttribute(selector: string, attribute:string, elm:any, regex?:RegExp, group?:number): string {
    const result = cheerio(selector, elm)
    if (result.length > 0) {
      const text = result.map((i:any, elm:any) => {
        return cheerio(elm).attr(attribute).trim()
      }).get().join(', ')

      if (regex) {
        return this.helper.getRegex(regex, text, group)
      } else {
        return text
      }
    } else {
      return ''
    }
  }
}
