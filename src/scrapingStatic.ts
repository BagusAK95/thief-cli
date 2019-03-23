import { ITarget, JsonObject, childs, format, IResult } from "./interface";
import { isNumber } from "util";
import Helper from "./helper";
import moment = require("moment");
const rp = require("request-promise");
const cheerio = require("cheerio");

export default class ScrapingStatic {
  private helper = new Helper();

  public async run(target: ITarget): Promise<IResult> {
    switch (target.stealingMode) {
      case "toDetail":
        return this.stealingToDetail(target);
      default:
        return this.stealingThisPage(target);
    }
  }

  private nextPage(html: any, nextPage?: JsonObject): any {
    if (nextPage) {
      let result = cheerio(nextPage.selector, html).attr(nextPage.attribute);
      if (nextPage.joinText)
        result = (nextPage.joinText as string).replace("$(result)", result);
      return result;
    }
  }

  private async stealingThisPage(target: ITarget): Promise<IResult> {
    return new Promise((resolve, reject) => {
      const result: IResult = { data: [] };

      rp(target.target)
        .then((html: any) => {
          result.next = this.nextPage(html, target.nextPage);

          cheerio(target.parent.selector, html).each((i: any, elem: any) => {
            const obj: JsonObject = {};

            target.childs.forEach(child => {
              obj[child.content] = this.getContent(child, elem);
            });

            result.data.push(obj);
          });

          resolve(result);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  private async stealingToDetail(target: ITarget): Promise<IResult> {
    return new Promise((resolve, reject) => {
      const result: IResult = { data: [] };

      rp(target.target)
        .then(async (html: any) => {
          result.next = this.nextPage(html, target.nextPage);

          const childs = cheerio(target.parent.selector, html);
          for (let i = 0; i < childs.length; i++) {
            await this.stealingChildDetail(target, childs[i]).then(data => {
              result.data.push(data);
            });
          }

          resolve(result);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  private async stealingChildDetail(
    target: ITarget,
    elem: any
  ): Promise<JsonObject> {
    return new Promise((resolve, reject) => {
      const obj: JsonObject = {};
      obj.source = elem.attribs[target.parent.attribute || "href"];

      rp(obj.source)
        .then((html: any) => {
          target.childs.forEach(child => {
            obj[child.content] = this.getContent(child, html);
          });

          resolve(obj);
        })
        .catch((err: any) => {
          reject(err);
        });
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
            const result = cheerio(elm)
              .attr(attribute)
              .trim();
            if (!result) {
              return cheerio(elm)
                .attr("data-" + attribute)
                .trim();
            } else {
              return result;
            }
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

      if (child.joinText)
        text = (child.joinText as string).replace("$(result)", text);

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
