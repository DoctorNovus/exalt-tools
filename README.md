# Exalt Tools
Command Line Tools for Exalt

---

# Warning
So far, the only two given fillers are `className` and `componentName`.

---

# Example Template

Each template should be in the root directory in folder `templates` with the name of the type. 

Example: /templates/nav-bar
```
import { Component, html } from "@exalt/core";

import style from "./{{componentName}}.css";

export class {{className}} extends Component {
    render(){
        return html`<div><a href="">Test</a></div>`;
    }
}

Component.create({ name: "{{componentName}}", styles: [style] }, {{className}});
```
