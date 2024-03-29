export interface IHelper {
  loadYaml(file: string): any;
  dumpYaml(file: string, object: any): void;
  setProp(prop: string, value: string): void;
  getProp(prop: string): Json;
  getChoises(): Array<IChoise>;
  getRegex(rgx: RegExp, str: string, grp: number): string;
  sleep(ms: number): void;
  success(str: string): void;
  error(str: string): void;
  warning(str: string): void;
  log(str: string): void;
}

export interface format {
  type: "string" | "number" | "date";
  dateFormat?: string;
  dateLocale?: string;
}
export type webContent = "static" | "dinamic";
export type stealingMode = "thisPage" | "toDetail";
export type saveAs = "csv" | "json";
export interface childs {
  content: string;
  selector: string;
  attribute?: string;
  regex?: RegExp;
  group?: number;
  format?: format;
  joinText?: string;
}
export interface ITarget {
  description: string;
  target: {
    uri: string;
    timeout?: number;
    qs?: {
      [x: string]: string;
    };
    headers?: {
      [x: string]: string;
    };
  };
  webContent?: webContent;
  autoScroll?: boolean;
  stealingMode?: stealingMode;
  interval?: number;
  parent: {
    selector: string;
    attribute?: string;
  };
  childs: childs[];
  nextPage?: {
    selector: string;
    attribute: string;
    joinText: string;
  };
  saveAs?: saveAs;
}

export interface IResult {
  data: Array<JsonObject>;
  next?: string;
}

export interface IChoise {
  name: string;
}

export type Json = null | string | number | boolean | JsonObject | JsonArray;
export interface JsonArray extends Array<Json> {}
export interface JsonObject {
  [x: string]: Json;
}
