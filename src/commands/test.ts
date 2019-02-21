import { Command } from "@oclif/command";
import { ITarget, format, childs } from "../interface";
import { cli } from "cli-ux";
import chalk from "chalk";
import Helper from "../helper";
import { isNumber } from "util";
import * as moment from "moment";
const rp = require("request-promise");
const cheerio = require("cheerio");
const Table = require("cli-table");

export default class Test extends Command {
  private helper = new Helper();

  static description = "test stealing data";

  async run(uri?: string) {
    cli.action.stop();

    const target: ITarget = this.helper.loadYaml(
      `./${this.helper.getProp("target")}.yml`
    );
    if (uri) target.target.uri = uri;

    this.log(`\nTry to stealing ${target.target.uri}\n`);
    switch (target.stealingMode) {
      case "toDetail":
        this.stealingToDetail(target).then(html => {
          this.nextPage(target, html);
        });

        break;
      default:
        this.stealingThisPage(target).then(html => {
          this.nextPage(target, html);
        });

        break;
    }
  }

  async nextPage(target: ITarget, html: any) {
    if (target.nextPage) {
      const next = cheerio(target.nextPage.selector, html).attr(
        target.nextPage.attribute
      );
      if (next) {
        if (!target.interval) {
          this.run(next);
        } else {
          cli.action.start("Taking a break");
          this.helper.sleep(Number(target.interval)).then(() => {
            this.run(next);
          });
        }
      }
    }
  }

  async stealingThisPage(target: ITarget): Promise<{}> {
    return new Promise(resolve => {
      rp(target.target)
        .then((html: any) => {
          cheerio(target.parent.selector, html).each((i: any, elem: any) => {
            this.log(`/* ${i + 1} */`);
            const table = new Table({
              head: [chalk.blueBright("Content"), chalk.blueBright("Result")],
              colWidths: [20, 100]
            });

            target.childs.forEach(child => {
              table.push([child.content, this.getContent(child, elem)]);
            });

            this.log(table.toString());
          });

          resolve(html);
        })
        .catch((err: any) => {
          this.error(err);
        });
    });
  }

  async stealingToDetail(target: ITarget): Promise<{}> {
    return new Promise(resolve => {
      rp(target.target)
        .then(async (html: any) => {
          const result = cheerio(target.parent.selector, html);
          for (let i = 0; i < result.length; i++) {
            await this.promiseDetail(target, i, result[i]);
          }

          resolve(html);
        })
        .catch((err: any) => {
          this.error(err);
        });
    });
  }

  async promiseDetail(target: ITarget, i: number, item: any) {
    await this.processDetail(target, i, item);
  }

  async processDetail(target: ITarget, i: number, elem: any): Promise<{}> {
    return new Promise(resolve => {
      const table = new Table({
        head: [chalk.blueBright("Content"), chalk.blueBright("Result")],
        colWidths: [20, 100]
      });

      if (target.parent.attribute) {
        table.push(["source", elem.attribs[target.parent.attribute]]);

        rp(elem.attribs[target.parent.attribute])
          .then((elem: any) => {
            this.log(`/* ${i + 1} */`);

            target.childs.forEach(child => {
              table.push([child.content, this.getContent(child, elem)]);
            });

            this.log(table.toString());

            resolve(elem);
          })
          .catch((err: any) => {
            this.error(err);
          });
      }
    });
  }

  private getContent(child: childs, elm: any): any {
    const { selector, attribute, regex, group, format } = child;

    const result = cheerio(selector, elm);
    if (result.length > 0) {
      let text: string;

      if (attribute) {
        text = result
          .map((i: any, elm: any) => {
            return cheerio(elm)
              .attr(attribute)
              .trim();
          })
          .get()
          .join(", ");
      } else {
        text = result
          .map((i: any, elm: any) => {
            return cheerio(elm)
              .text()
              .replace(/\s+/g, " ")
              .trim();
          })
          .get()
          .join(", ");
      }

      if (regex) {
        return this.formatData(
          this.helper.getRegex(regex, text, group),
          format
        );
      } else {
        return this.formatData(text, format);
      }
    } else {
      return "";
    }
  }

  private formatData(str: string, format?: format): any {
    if (format) {
      switch (format.type) {
        case "number":
          if (isNumber(str)) {
            return Number(str);
          } else {
            return str;
          }
        case "date":
          const dateFormat = format.dateFormat || "YYYY-MM-DD HH:mm:ss";
          const dateLocale = format.dateLocale || "id";
          return moment(str, dateFormat)
            .locale(dateLocale)
            .format("YYYY-MM-DD HH:mm:ss");
        default:
          return str;
      }
    } else {
      return str;
    }
  }
}
