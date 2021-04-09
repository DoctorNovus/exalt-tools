#!/usr/bin/env node
'use strict';

var fs = require('fs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);

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
                    file = file.split(".tt")[0];
                    if (args[0] == file) {
                        let component = args[1].split("-").map(a => capitalize(a)).join("");

                        let content = fs__default['default'].readFileSync(`${path}/${file}.tt`);
                        content = Buffer.from(content).toString("utf-8");
                        content = fill(content, {
                            className: component,
                            componentName: args[1]
                        });

                        output(args[1], content);
                        error = false;
                    }
                }

                if (error)
                    console.log("Invalid type. Please make sure you either choose 'base' or a type inside your root/templates folder.");
            } else {
                console.log("Invalid type. Please make sure you either choose 'base' or a type inside your root/templates folder.");
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
            console.log(`Exalt-Tools Base Options:\n- create`);
    }
}

let args = process.argv;
args.shift();
args.shift();

let command = args.shift();

runCommand(command, args);
