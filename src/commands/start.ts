import { Command } from "@oclif/command";

export default class Start extends Command {
  static description = "start stealing data";

  async run() {
    this.warn("This command is under development");
  }
}
