import create from "../commands/create";
import { color } from "./logger";

export function runCommand(command, args) {
    switch (command) {
        case "create":
            create(args);
            break;

        default:
            console.log(`${color.bright}${color.fgBlue}Exalt-Tools Base Options:\n${color.fgCyan}- create${color.reset}`);
    }
}