import Robot, {Directions} from "./robot"

export const WRONG_PLACE_CMD_PATTERN = "Error, the pattern of the input Place command is incorrect";

export default class CommandPlatform {
  private robot: Robot

  constructor(robot: Robot) {
    this.robot = robot;
  }

  public printMessage(message: string) {
      process.stdout.write(message + "\n")
  }

  private printExecutionResult(successFlag: boolean): string {
    const msg = successFlag ? "Operation success": this.robot.abnormalStatus;
    this.printMessage(msg);
    return msg;
  }

  public execute(cmd: string): void {
    const convertedCmd = cmd.toUpperCase().replace("\t", " ").trim();

    switch (convertedCmd) {
      case "LEFT":
        this.printExecutionResult(this.robot.turnLeft());
        break
      case "RIGHT":
        this.printExecutionResult(this.robot.turnRight());
        break
      case "MOVE":
        this.printExecutionResult(this.robot.move());
        break
      case "REPORT":
        this.printMessage(this.robot.report());
        break;
      case "EXIT":
        this.printMessage("[You have left the game]");
        process.exit();
      default:
        if (convertedCmd.indexOf("PLACE") >=0 ) {
          this.parsePlaceCommand(convertedCmd);
        } else {
          this.printMessage("Error, unrecognised command");
        }
    }
  }

	parsePlaceCommand(commandString: string): string {

		const cmdParts = commandString.split(" ");

		// cmdParts[0] should be "PLACE", otherwise this is a string with wrong pattern
		if ("PLACE" != cmdParts[0]) {
      this.printMessage(WRONG_PLACE_CMD_PATTERN);
			return WRONG_PLACE_CMD_PATTERN;
		}

		commandString = commandString.replace("PLACE", "").trim();
		// then commandString becomes a string like " 0 ,  1, WEST"

		const params = commandString.split(",");
		// params should be like {" 0 ", "  1", " WEST"}

		if (params.length != 3) {
      this.printMessage(WRONG_PLACE_CMD_PATTERN);
      return WRONG_PLACE_CMD_PATTERN;
		}

		let x: number, y: number;
		try {
			x = Number(params[0].trim());
			y = Number(params[1].trim());
		} catch (e) {
      this.printMessage(WRONG_PLACE_CMD_PATTERN);
      return WRONG_PLACE_CMD_PATTERN;
		}

    if( !Number.isInteger(x) || !Number.isInteger(y) ) {
      this.printMessage(WRONG_PLACE_CMD_PATTERN);
      return WRONG_PLACE_CMD_PATTERN;
    }

    const direction = Directions.find(item => item.label === params[2].trim());

		if (direction == null) {
      this.printMessage(WRONG_PLACE_CMD_PATTERN);
      return WRONG_PLACE_CMD_PATTERN;
		}

    return this.printExecutionResult(this.robot.place(x, y, direction.direction));
	}

}
