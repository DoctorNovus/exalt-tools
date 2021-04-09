import base from "../templates/base";
import output from "../utils/file-system";
import fill from "../utils/filler";
import fs from "fs";

export default function create(args) {
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

            if (fs.existsSync(path)) {
                if (!args[1]) {
                    console.log("Please use the syntax:\nexalt-tools create <type> <component-name>");
                    return;
                }

                let files = fs.readdirSync(path);
                let error = true;

                for (let file of files) {
                    file = file.split(".tt")[0];
                    if (args[0] == file) {
                        let component = args[1].split("-").map(a => capitalize(a)).join("");

                        let content = fs.readFileSync(`${path}/${file}.tt`);
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
}