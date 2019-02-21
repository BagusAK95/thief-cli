export interface format { type: "string"|"number"|"date", dateFormat?:string, dateLocale?:string }
export type scrapingMode = 'thisPage'|'toDetail';
export type methodRequest = 'GET'|'POST'|'PUT'|'DELETE';
export type saveAs = 'csv'|'json';
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
        attribute?: string,
        regex?: RegExp, //To do
        group?: number, //To do
        format?: format, //To do
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