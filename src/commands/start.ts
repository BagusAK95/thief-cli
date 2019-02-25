import { Command } from "@oclif/command";
import { ITarget, JsonObject, Json } from "../interface";
import { cli } from "cli-ux";
import Helper from "../helper";
import ScrapingStatic from "../scrapingStatic";

export default class Start extends Command {
  private helper = new Helper();
  private scrapingStatic = new ScrapingStatic();
  private target: string = "";
  private result: Array<JsonObject> = [];

  static description = "start stealing data";

  async run() {
    this.target = this.helper.getProp("target") as string;

    const target: ITarget = this.helper.loadYaml(`./${this.target}.yml`);

    this.start(target);
  }

  async start(target: ITarget) {
    cli.action.start(`Try to stealing ${target.target.uri}`);

    this.scrapingStatic
      .run(target)
      .then(data => {
        cli.action.stop();

        this.result = this.result.concat(data.data);

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
        } else {
          switch (target.saveAs) {
            case "csv":
              this.helper.dumpCsv(this.target, this.result);
              break;
            default:
              this.helper.dumpJson(this.target, this.result);
              break;
          }
        }
      })
      .catch(err => {
        this.error(err.message);
      });
  }
}
