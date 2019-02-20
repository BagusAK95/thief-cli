import { JsonObject, Json, IChoise } from "./interface";
import chalk from 'chalk';
const yaml = require("js-yaml");
const fs = require("fs");
const os = require("os");

export default class Helper {
    public loadYaml(file : string) : any {
        if (fs.existsSync(file)) {
            return yaml.safeLoad(fs.readFileSync(file, "utf8"));
        } else {
            console.log(` ${chalk.yellowBright('›')}   Warning: Please select your target first`)
            throw 'Please select your target first'
        }
    }

    public dumpYaml(file : string, object : any) : void {
        fs.writeFileSync(file, yaml.safeDump(object, { indent: 4, lineWidth: 150 }), "utf8");
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

    public success(str:string): void {
        console.log(` ${chalk.greenBright('✔')}   Success: ${str}`)
    }

    public getRegex(rgx:RegExp, str:string, grp:number = 0): string {
        const result:Array<string> = [];
        const regex:RegExp = new RegExp(rgx, 'gm');
        
        let m:any;
        while ((m = regex.exec(str)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            
            m.forEach((match:string, groupIndex:string) => {
                result.push(match);
            });
        }

        if (result.length >= grp) {
            return result[grp]
        } else {
            return ''
        }
    }
}