export interface IHelper {
    loadYaml(file: string): any;
    dumpYaml(file: string, object: any): void;
    statYaml(file: string): Promise<JsonObject>;
    setProp(prop : string, value : string) : void;
    getProp(prop : string) : Json;
    getChoises() : Array<IChoise>;
    sleep(ms: number): Promise<{}>;
}

export type scrapingMode = 'thisPage'|'toDetail';
export type methodRequest = 'GET'|'POST'|'PUT'|'DELETE';
export type saveAs = 'csv'|'json'|rdbms;
export interface rdbms {
    client: string,
    host: string,
    port: number,
    username: string,
    password: string,
    database: string,
    table: string
}
export interface ITarget {
    description: string,
    target: {
        uri: string,
        method?: methodRequest,
        timeout?: number,
        qs?: {
            [x: string]: string
        },
        headers?: {
            [x: string]: string
        },
        body?: {
            [x: string]: Json
        },
        formData?: {
            [x: string]: Json
        }
    },
    scrapingMode?: scrapingMode,
    interval?: number,
    parent: {
        selector: string,
        attribute?: string
    },
    childs: {
        content: string,
        selector: string,
        attribute?: string
        regexCode?: string //To do
        regexGroup?: string //To do
    }[],
    nextPage?: {
        selector: string,
        attribute: string
    },
    saveAs?: saveAs, //To do
}

export interface IChoise {
    name: string
}

export type Json = null|string|number|boolean|JsonObject|JsonArray;
export interface JsonArray extends Array<Json> { }
export interface JsonObject {
    [x: string]: Json;
}