import { runCommand } from "./utils/handler";

let args = process.argv;
args.shift();
args.shift();

let command = args.shift();

runCommand(command, args);
