import { IHelper, JsonObject, Json, JsonArray, IChoise } from "./interface";
const yaml = require("js-yaml");
const fs = require("fs");
const os = require("os");

export default class Helper implements IHelper {
    public loadYaml(file : string) : any {
        return yaml.safeLoad(fs.readFileSync(file, "utf8"));
    }

    public dumpYaml(file : string, object : any) : void {
        fs.writeFileSync(file, yaml.safeDump(object, { indent: 4, lineWidth: 150 }), "utf8");
    }

    public statYaml(file:string): Promise<JsonObject> {
        return new Promise((resolve) => {
            fs.stat(file, (err:any, stats:any) => {
                resolve(stats)
            })
        });
    }

    public setProp(prop : string, value : string) : void {
        const jsonPath = `${os.homedir()}/.thiefjson`;
        
        let jsonProp:JsonObject = {};
        if (fs.existsSync(jsonPath)) {
            jsonProp = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
        }

        jsonProp[prop] = value;

        fs.writeFileSync(jsonPath, JSON.stringify(jsonProp), "utf8");
    }

    public getProp(prop : string) : Json {
        const jsonPath = `${os.homedir()}/.thiefjson`;

        let jsonProp:JsonObject = {};
        if (fs.existsSync(jsonPath)) {
            jsonProp = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
        }

        return jsonProp[prop];
    }

    public getChoises() : Array<IChoise> {
        const files:Array<IChoise> = []
        
        fs.readdirSync('./').forEach((file:string) => {
            if (file.endsWith('.yml')) files.push({name : file.substring(0, file.length - 4)})
        })

        return files
    }

    public sleep(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}