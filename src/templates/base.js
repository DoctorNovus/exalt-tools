export default `import { Component, html } from "@exalt/core";

import style from "./{{componentName}}.css";

export class {{className}} extends Component {
    render(){
        return html\`\`;
    }
}

Component.create({ name: "{{componentName}}", styles: [style] }, {{className}});`
