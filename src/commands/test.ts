import { Command } from "@oclif/command";
import { ITarget } from "../interface";
import { cli } from "cli-ux";
import Helper from "../helper";
import ScrapingStatic from "../scrapingStatic";
import chalk from "chalk";
const Table = require("cli-table");

export default class Test extends Command {
  private helper = new Helper();
  private scrapingStatic = new ScrapingStatic();

  static description = "test stealing data";

  async run() {
    const target: ITarget = this.helper.loadYaml(
      `./${this.helper.getProp("target")}.yml`
    );

    this.start(target);
  }

  async start(target: ITarget) {
    cli.action.start(`Try to stealing ${target.target.uri}`);

    this.scrapingStatic
      .run(target)
      .then(data => {
        cli.action.stop();

        data.data.forEach(obj => {
          const table = new Table({
            head: [chalk.blueBright("Content"), chalk.blueBright("Result")],
            colWidths: [20, 100]
          });

          Object.keys(obj).forEach(key => {
            table.push([key, obj[key]]);
          });

          this.log(table.toString());
        });

        if (data.next) {
          target.target.uri = data.next;

          if (target.interval) {
            cli.action.start("Taking a break");

            this.helper.sleep(Number(target.interval)).then(() => {
              cli.action.stop();

              this.start(target);
            });
          } else {
            this.start(target);
          }
        }
      })
      .catch(err => {
        this.error(err.message);
      });
  }
}
