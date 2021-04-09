export default {
    input: "src/index.js",
    output: {
        file: "bin/exalt-tools.js",
        format: "cjs",
        banner: "#!/usr/bin/env node",
        inlineDynamicImports: true
    }
}