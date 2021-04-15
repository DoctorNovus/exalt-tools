#!/usr/bin/env node
'use strict';

var fs = require('fs');
var fetch = require('node-fetch');
var dns = require('dns');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);
var dns__default = /*#__PURE__*/_interopDefaultLegacy(dns);

var base = `import { Component, html } from "@exalt/core";

import style from "./{{componentName}}.css";

export class {{className}} extends Component {
    render(){
        return html\`\`;
    }
}

Component.create({ name: "{{componentName}}", styles: [style] }, {{className}});`;

function output(name, data) {
    let base = `${process.cwd()}/src/components`;
    if(!fs__default['default'].existsSync(base))
        fs__default['default'].mkdirSync(base);

    let path = `${base}/${name}`;

    if (!fs__default['default'].existsSync(path))
        fs__default['default'].mkdirSync(path);

    fs__default['default'].writeFileSync(`${path}/${name}.js`, data);
    fs__default['default'].writeFileSync(`${path}/${name}.css`, "");
}

function fill(data, objects) {
    for (let x in objects) {
        let key = x;
        let val = objects[x];

        let reg = new RegExp("{{" + key + "}}", "g");

        let str = val;        
        let reg2 = new RegExp("{{data}}", "g");
        str = str.replace(reg2, val);

        data = data.replace(reg, str);
    }

    return data;
}

let color = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    nlink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    fgBlack: "\x1b[30m",
    fgRed: "\x1b[31m",
    fgGreen: "\x1b[32m",
    fgYellow: "\x1b[33m",
    fgBlue: "\x1b[34m",
    fgMagenta: "\x1b[35m",
    fgCyan: "\x1b[36m",
    fgWhite: "\x1b[37m",

    bgBlack: "\x1b[40m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
    bgYellow: "\x1b[43m",
    bgBlue: "\x1b[44m",
    bgMagenta: "\x1b[45m",
    bgCyan: "\x1b[46m",
    bgWhite: "\x1b[47m"
};

function create(args) {
    let content = "";

    switch (args[0]) {
        case "base":
            if (!args[1]) {
                console.log("Please use the syntax:\n exalt-tools create base <component-name>\nExample: \nexalt-tools create base app-root");
                return;
            }

            let component = args[1].split("-").map(a => capitalize(a)).join("");

            content = fill(base, {
                className: component,
                componentName: args[1]
            });

            output(args[1], content);
            break;

        default:
            let path = `${process.cwd()}/templates`;

            if (fs__default['default'].existsSync(path)) {
                if (!args[1]) {
                    console.log("Please use the syntax:\nexalt-tools create <type> <component-name>");
                    return;
                }

                let files = fs__default['default'].readdirSync(path);
                let error = true;

                for (let file of files) {
                    let ext = ".tt";
                    if (!file.endsWith(".tt"))
                        if (file.endsWith(".txt"))
                            ext = ".txt";
                        else
                            return;

                    file = file.split(`${ext}`)[0];
                    if (args[0] == file) {
                        let component = args[1].split("-").map(a => capitalize(a)).join("");

                        let content = fs__default['default'].readFileSync(`${path}/${file}${ext}`);
                        content = Buffer.from(content).toString("utf-8");
                        content = fill(content, {
                            className: component,
                            componentName: args[1]
                        });

                        output(args[1], content);
                        console.log(`${color.fgGreen}[SUCCESS] ${color.fgWhite}${args[1]} has officially been made. Please check your component folder.${color.reset}`);
                        error = false;
                    }
                }

                if (error)
                    console.log(`${color.red}[ERROR] ${color.reset}Invalid type. Please make sure you either choose 'base' or a type inside your root/templates folder.`);
            } else {
                console.log(`${color.red}[ERROR] ${color.reset}Invalid type. Please make sure you either choose 'base' or a type inside your root/templates folder.`);
            }
    }

    console.log(content);
}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
};

function runCommand(command, args) {
    switch (command) {
        case "create":
            create(args);
            break;

        default:
            console.log(`${color.bright}${color.fgBlue}Exalt-Tools Base Options:\n${color.fgCyan}- create${color.reset}`);
    }
}

var version = "1.0.15";

let args = process.argv;
args.shift();
args.shift();

let command = args.shift();

runCommand(command, args);

dns__default['default'].resolve('www.google.com', function (err) {
    if (err) {
        return;
    } else {
        fetch__default['default']("https://raw.githubusercontent.com/danielwedding/exalt-tools/master/package.json")
            .then(res => res.json())
            .then(data => {
                if (data.version > version) {
                    console.log(`${color.fgYellow}[WARNING] You are not using the latest version of exalt-tools. Please update your package for latest features.${color.reset}`);
                }
            });
    }
});
