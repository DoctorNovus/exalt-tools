import { runCommand } from "./utils/handler";
import fetch from "node-fetch";
import { version } from "../package.json";
import { color } from "../src/utils/logger";
import dns from "dns";

let args = process.argv;
args.shift();
args.shift();

let command = args.shift();

runCommand(command, args);

dns.resolve('www.google.com', function (err) {
    if (err) {
        return;
    } else {
        fetch("https://raw.githubusercontent.com/danielwedding/exalt-tools/master/package.json")
            .then(res => res.json())
            .then(data => {
                if (data.version > version) {
                    console.log(`${color.fgYellow}[WARNING] You are not using the latest version of exalt-tools. Please update your package for latest features.${color.reset}`);
                }
            });
    }
});