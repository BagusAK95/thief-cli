import { Command } from "@oclif/command";
import Helper from "../helper";
import chalk from "chalk";

export default class CurrentTarget extends Command {
  private helper = new Helper();

  static description = "your active target";

  async run() {
    const target = this.helper.getProp("target");
    if (target) {
      this.log(`Your active target is ${chalk.blueBright(target.toString())}`);
    } else {
      this.warn(`Please select your target first`);
    }
  }
}
