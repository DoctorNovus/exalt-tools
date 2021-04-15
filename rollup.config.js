import json from "@rollup/plugin-json";
import { dependencies } from "./package.json";
import { builtinModules } from "module";

export default {
    input: "src/index.js",
    output: {
        file: "bin/exalt-tools.js",
        format: "cjs",
        banner: "#!/usr/bin/env node",
        inlineDynamicImports: true
    },
    plugins: [
        json(),
    ],
    external: builtinModules.concat(Object.keys(dependencies))
}