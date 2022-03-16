
import Robot, { Direction, INVALID_POSITION_ERROR, isDirectionValid, isLocationValid, NOT_INITIATED_ERROR } from "./robot";
import { expect } from "chai"


describe('Test Robots tool methods', () => {
    let robot: Robot;

    beforeEach(() => {
        robot = new Robot();
    });

    it('test method isLocationValid, xMin and yMin is valid', () => {
        expect(isLocationValid(0, 0)).to.eq(true);
    })

    it('test method isLocationValid, xMax and yMax is valid', () => {
        expect(isLocationValid(4, 4)).to.eq(true);
    })

    it('test method isLocationValid, invalid x and y', () => {
        expect(isLocationValid(-1, 4)).to.eq(false);
        expect(isLocationValid(0, 5)).to.eq(false);
    })

    it('test method isDirectionValid, direction EAST', () => {
        expect(isDirectionValid(Direction.EAST)).to.eq(true);
    })

    it('test method isDirectionValid, invalid direction -1', () => {
        expect(isDirectionValid(-1)).to.eq(false);
    })

    it('test method moveForward, start from [2, 2], face Sourth(no boundary limits for this method)', () => {
        const newPos = robot.getPositionAfterNextMove(2, 2, Direction.SOUTH);
        expect(newPos.x).to.eq(2);
        expect(newPos.y).to.eq(1);
    })
});


describe('Test Robots PLACE scenarios', () => {
    let robot: Robot;

    beforeEach(() => {
        robot = new Robot();
    });

    it('place robot in valid postion(center)', () => {
        expect(robot.place(2, 2, Direction.NORTH)).to.eq(true);
        expect(robot.x).to.eq(2);
        expect(robot.y).to.eq(2);
        expect(robot.direction).to.eq(Direction.NORTH);
    })

    it('place robot in valid postion(north west corner)', () => {
        expect(robot.place(0, 4, Direction.NORTH)).to.eq(true);
        expect(robot.x).to.eq(0);
        expect(robot.y).to.eq(4);
        expect(robot.direction).to.eq(Direction.NORTH);
    })

    it('place robot in valid postion(north east corner)', () => {
        expect(robot.place(4, 4, Direction.SOUTH)).to.eq(true);
        expect(robot.x).to.eq(4);
        expect(robot.y).to.eq(4);
        expect(robot.direction).to.eq(Direction.SOUTH);
    })

    it('place robot in valid postion(south east corner)', () => {
        expect(robot.place(4, 0, Direction.EAST)).to.eq(true);
        expect(robot.x).to.eq(4);
        expect(robot.y).to.eq(0);
        expect(robot.direction).to.eq(Direction.EAST);
    })

    it('place robot in valid postion(south west corner)', () => {
        expect(robot.place(0, 0, Direction.WEST)).to.eq(true);
        expect(robot.x).to.eq(0);
        expect(robot.y).to.eq(0);
        expect(robot.direction).to.eq(Direction.WEST);
    })

    it('place robot in a invalid postion', () => {
        expect(robot.place(-1, 5, Direction.WEST)).to.eq(false);
        expect(robot.abnormalStatus).to.eq(NOT_INITIATED_ERROR);
        expect(robot.initiated).to.eq(false);
    })
    it('place robot in a invalid direction', () => {
        expect(robot.place(0, 0, -1)).to.eq(false);
        expect(robot.abnormalStatus).to.eq(NOT_INITIATED_ERROR);
        expect(robot.initiated).to.eq(false);
    })
});


describe('Test Robots MOVE scenarios', () => {
    let robot: Robot;

    beforeEach(() => {
        robot = new Robot();

    });

    it('move robot when unintiated(Place cmd has not been executed)', () => {
        expect(robot.move()).to.eq(false);
        expect(robot.abnormalStatus).to.eq(NOT_INITIATED_ERROR);
    })

    it('move robot from [2,2] to [2,3]', () => {
        expect(robot.place(2, 2, Direction.NORTH)).to.eq(true);
        expect(robot.move()).to.eq(true);
        expect(robot.x).to.eq(2);
        expect(robot.y).to.eq(3);
        expect(robot.direction).to.eq(Direction.NORTH);
    })

    it('move robot from [2,2] to [3,2]', () => {
        expect(robot.place(2, 2, Direction.EAST)).to.eq(true);
        expect(robot.move()).to.eq(true);
        expect(robot.x).to.eq(3);
        expect(robot.y).to.eq(2);
        expect(robot.direction).to.eq(Direction.EAST);
    })

    it('move robot from [2,2] to [2,1]', () => {
        expect(robot.place(2, 2, Direction.SOUTH)).to.eq(true);
        expect(robot.move()).to.eq(true);
        expect(robot.x).to.eq(2);
        expect(robot.y).to.eq(1);
        expect(robot.direction).to.eq(Direction.SOUTH);
    })

    it('move robot from [2,2] to [1,2]', () => {
        expect(robot.place(2, 2, Direction.WEST)).to.eq(true);
        expect(robot.move()).to.eq(true);
        expect(robot.x).to.eq(1);
        expect(robot.y).to.eq(2);
        expect(robot.direction).to.eq(Direction.WEST);
    })

    it('move robot out of the north boundary', () => {
        expect(robot.place(4, 4, Direction.NORTH)).to.eq(true);
        expect(robot.move()).to.eq(false);
        expect(robot.abnormalStatus).to.eq(INVALID_POSITION_ERROR);
    })

    it('move robot out of the east boundary', () => {
        expect(robot.place(4, 4, Direction.EAST)).to.eq(true);
        expect(robot.move()).to.eq(false);
        expect(robot.abnormalStatus).to.eq(INVALID_POSITION_ERROR);
    })

    it('move robot out of the south boundary', () => {
        expect(robot.place(4, 0, Direction.SOUTH)).to.eq(true);
        expect(robot.move()).to.eq(false);
        expect(robot.abnormalStatus).to.eq(INVALID_POSITION_ERROR);
    })

    it('move robot out of the west boundary', () => {
        expect(robot.place(0, 0, Direction.WEST)).to.eq(true);
        expect(robot.move()).to.eq(false);
        expect(robot.abnormalStatus).to.eq(INVALID_POSITION_ERROR);
    })
});


describe('Test Robots LEFT scenarios', () => {
    let robot: Robot;

    beforeEach(() => {
        robot = new Robot();
    });

    it('run LEFT when unintiated(Place cmd has not been executed)', () => {
        expect(robot.turnLeft()).to.eq(false);
        expect(robot.abnormalStatus).to.eq(NOT_INITIATED_ERROR);
    })

    it('when facing north, turn left', () => {
        expect(robot.place(2, 2, Direction.NORTH)).to.eq(true);
        expect(robot.turnLeft()).to.eq(true);
        expect(robot.direction).to.eq(Direction.WEST);
    })

    it('when facing east, turn left', () => {
        expect(robot.place(2, 2, Direction.EAST)).to.eq(true);
        expect(robot.turnLeft()).to.eq(true);
        expect(robot.direction).to.eq(Direction.NORTH);
    })

    it('when facing south, turn left', () => {
        expect(robot.place(2, 2, Direction.SOUTH)).to.eq(true);
        expect(robot.turnLeft()).to.eq(true);
        expect(robot.direction).to.eq(Direction.EAST);
    })

    it('when facing west, turn left', () => {
        expect(robot.place(2, 2, Direction.WEST)).to.eq(true);
        expect(robot.turnLeft()).to.eq(true);
        expect(robot.direction).to.eq(Direction.SOUTH);
    })
});


describe('Test Robots RIGHT scenarios', () => {
    let robot: Robot;

    beforeEach(() => {
        robot = new Robot();
    });

    it('run LEFT when unintiated(Place cmd has not been executed)', () => {
        expect(robot.turnRight()).to.eq(false);
        expect(robot.abnormalStatus).to.eq(NOT_INITIATED_ERROR);
    })

    it('when facing north, turn right', () => {
        expect(robot.place(2, 2, Direction.NORTH)).to.eq(true);
        expect(robot.turnRight()).to.eq(true);
        expect(robot.direction).to.eq(Direction.EAST);
    })

    it('when facing east, turn right', () => {
        expect(robot.place(2, 2, Direction.EAST)).to.eq(true);
        expect(robot.turnRight()).to.eq(true);
        expect(robot.direction).to.eq(Direction.SOUTH);
    })

    it('when facing south, turn right', () => {
        expect(robot.place(2, 2, Direction.SOUTH)).to.eq(true);
        expect(robot.turnRight()).to.eq(true);
        expect(robot.direction).to.eq(Direction.WEST);
    })

    it('when facing west, turn right', () => {
        expect(robot.place(2, 2, Direction.WEST)).to.eq(true);
        expect(robot.turnRight()).to.eq(true);
        expect(robot.direction).to.eq(Direction.NORTH);
    })
});


describe('Test Robots REPORT scenarios', () => {
    let robot: Robot;

    beforeEach(() => {
        robot = new Robot();
    });

    it('run REPORT when unintiated(Place cmd has not been executed)', () => {
        expect(robot.report()).to.eq(NOT_INITIATED_ERROR);
    })

    it('when placing in a valid postion', () => {
        expect(robot.place(0, 4, Direction.NORTH)).to.eq(true);
        expect(robot.report()).to.eq( 0 + "," + 4 + ",NORTH" );
    })

    it('when placing in a invalid postion', () => {
        expect(robot.place(0, -1, Direction.NORTH)).to.eq(false);
        expect(robot.report()).to.eq(NOT_INITIATED_ERROR);
    })
});