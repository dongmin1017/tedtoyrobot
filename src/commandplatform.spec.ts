
import Robot, { Direction, INVALID_POSITION_ERROR, isDirectionValid, isLocationValid, NOT_INITIATED_ERROR } from "./robot";
import CommandPlatform from "./commandplatform"
import { expect } from "chai"
import { createImportDeclaration } from "typescript";


describe('Commands unit tests', () => {
    let robot: Robot;
    let cmdPlatform: CommandPlatform;

    beforeEach(() => {
        robot = new Robot();
        cmdPlatform = new CommandPlatform(robot);
    });

    it('run a valid PLACE cmd ', () => {
        cmdPlatform.execute("PLACE 4, 0,   NORTH");
        expect(robot.x).to.eq(4);
        expect(robot.y).to.eq(0);
        expect(robot.direction).to.eq(Direction.NORTH);
    })

    it('run a invalid PLACE cmd ', () => {
        cmdPlatform.execute("PLACE -4, 0,   NORTH");
        expect(robot.abnormalStatus).to.eq(NOT_INITIATED_ERROR);
    })

    it('run MOVE cmd when uninitiated', () => {
        cmdPlatform.execute("MOVE");
        expect(robot.abnormalStatus).to.eq(NOT_INITIATED_ERROR);
    })

    it('move robot to a valid postion', () => {
        cmdPlatform.execute("PLACE 2, 2,   EAST");
        cmdPlatform.execute("MOVE");
        expect(robot.x).to.eq(3);
        expect(robot.y).to.eq(2);
    })

    it('move robot to an invalid postion', () => {
        cmdPlatform.execute("PLACE 4, 4,   NORTH");
        cmdPlatform.execute("MOVE");
        expect(robot.abnormalStatus).to.eq(INVALID_POSITION_ERROR);
        expect(robot.x).to.eq(4);
        expect(robot.x).to.eq(4);
    })

    it('a wrong MOVE command', () => {
        cmdPlatform.execute("PLACE 4, 4,   NORTH");
        cmdPlatform.execute("MOVE 1123");
        expect(robot.x).to.eq(4);
        expect(robot.x).to.eq(4);
    })

    it('run LEFT cmd when uninitiated', () => {
        cmdPlatform.execute("LEFT");
        expect(robot.abnormalStatus).to.eq(NOT_INITIATED_ERROR);
    })

    it('run LEFT cmd when initiated', () => {
        cmdPlatform.execute("PLACE 2, 2,   WEST");
        cmdPlatform.execute("LEFT");
        expect(robot.direction).to.eq(Direction.SOUTH);
    })

    it('run RIGHT cmd when uninitiated', () => {
        cmdPlatform.execute("RIGHT");
        expect(robot.abnormalStatus).to.eq(NOT_INITIATED_ERROR);
    })

    it('run RIGHT cmd when initiated', () => {
        cmdPlatform.execute("PLACE 2, 2,   WEST");
        cmdPlatform.execute("RIGHT");
        expect(robot.direction).to.eq(Direction.NORTH);
    })

    it('run REPORT cmd when uninitiated', () => {
        cmdPlatform.execute("REPORT");
        expect(robot.abnormalStatus).to.eq(NOT_INITIATED_ERROR);
    })

    it('run REPORT cmd when initiated', () => {
        cmdPlatform.execute("PLACE 4, 0,   WEST");
        cmdPlatform.execute("REPORT");
        expect(robot.report()).to.eq('4,0,WEST');
    })
});

describe('Commands integration tests', () => {
    let robot: Robot;
    let cmdPlatform: CommandPlatform;

    beforeEach(() => {
        robot = new Robot();
        cmdPlatform = new CommandPlatform(robot);
    });

    it('move robot from the north east corner to south east corner, then to south west corner, then to north west corner, then to north east corner', () => {
 
        const commands = [
            "PLACE 4, 4, SOUTH", "MOVE", "MOVE", "MOVE", "MOVE",
            "RIGHT", "MOVE", "MOVE", "MOVE", "MOVE",
            "RIGHT", "MOVE", "MOVE", "MOVE", "MOVE",
            "RIGHT", "MOVE", "MOVE", "MOVE", "MOVE"];
        commands.forEach(element => {
            cmdPlatform.execute(element);
        });

        expect(robot.report()).to.eq('4,4,EAST');
    });

    it('move robot from north west to south east', () => {
        const commands = [
            "PLACE 0, 4, SOUTH", "MOVE", "LEFT", "MOVE", "RIGHT",
            "MOVE", "LEFT", "MOVE", "RIGHT",
            "MOVE", "LEFT", "MOVE", "RIGHT",
            "MOVE", "LEFT", "MOVE"
        ];
        commands.forEach(element => {
            cmdPlatform.execute(element);
        });

        expect(robot.report()).to.eq('4,0,EAST');
    });
});