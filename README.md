# Exalt Tools
Command Line Tools for Exalt


---

# Installation
`npm install -g exalt-tools`

or usage case:

`npx exalt-tools`


# Warning
So far, the only two given fillers are `className` and `componentName`.

---

# CLI Usage

`exalt-tools <command>`

# Commands
- `create base <component-name>`
- `create <type> <component-name>`
  
---

# Example Template

Each template should be in the root directory in folder `templates` with the name of the type. 

Example: /templates/nav-bar.tt
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

Template extension can either be `.txt` or `.tt`.
