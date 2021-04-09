import fs from "fs";

export default function output(name, data) {
    let base = `${process.cwd()}/src/components`;
    if(!fs.existsSync(base))
        fs.mkdirSync(base);

    let path = `${base}/${name}`;

    if (!fs.existsSync(path))
        fs.mkdirSync(path);

    fs.writeFileSync(`${path}/${name}.js`, data);
    fs.writeFileSync(`${path}/${name}.css`, "");
}