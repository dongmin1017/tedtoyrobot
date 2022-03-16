
import { createInterface } from "readline"
import {stdin, stdout} from "process"
import CommandPlatform from "./commandplatform"
import Robot from "./robot";

const client = createInterface({
  input: stdin,
  output: stdout,
  terminal: false
})

process.stdout.write("Guide of Ted's robot toy game\n");
process.stdout.write("Commands in this app are not case sensitive. Characters like space and tab are supported\n");
process.stdout.write("Currently the following expressions are supported:\n");
process.stdout.write("1)  'PLACE 1,2,NORTH'.  For numbers only integer accepted.\n");
process.stdout.write("2)  'MOVE'\n");
process.stdout.write("3)  'LEFT'\n");
process.stdout.write("4)  'RIGHT'\n");
process.stdout.write("5)  'REPORT'\n");
process.stdout.write("6)  'EXIT', to quit the game\n");
process.stdout.write("===========================================================");
process.stdout.write('\n');
process.stdout.write("[Please input your command]:");

const command = new CommandPlatform(new Robot());
client.on("line", (line: string) => {
  command.execute(line);
})
