export default class Robot {
    x: number;
    y: number;
    direction: Direction;
    initiated: boolean;
    abnormalStatus: string;

    constructor() {
        this.x = -1
        this.y = -1
        this.direction = -1;
        this.initiated = false;
        this.abnormalStatus = '';
    }

    getPositionAfterNextMove(x: number, y: number, direction: Direction) {
        if( direction == Direction.EAST ) {
            x++;
        }
        else if( direction == Direction.SOUTH ) {
            y--;
        }
        else if( direction == Direction.WEST ) {
            x--;
        }
        else if( direction == Direction.NORTH ) {
            y++;
        }
        else {
            throw new Error('Invalid direction.');
        }

        return {x: x, y: y};
    }

    public place(x: number, y: number, direction: Direction): boolean {
        if (!isLocationValid(x, y)) {
            this.abnormalStatus = NOT_INITIATED_ERROR;
            this.initiated = false;
            return false;
        }

        if (!isDirectionValid(direction)) {
            this.abnormalStatus = NOT_INITIATED_ERROR;
            this.initiated = false;
            return false;
        }

        this.x = x;
        this.y = y;
        this.direction = direction;

        this.initiated = true;
        this.abnormalStatus = '';
        return true;
    }

    public move(): boolean {
        if( !this.initiated ) {
            this.abnormalStatus = NOT_INITIATED_ERROR;
            return false;
        }

        const newPosition = this.getPositionAfterNextMove(this.x, this.y, this.direction);

        if (!isLocationValid(newPosition.x, newPosition.y)) {
            this.abnormalStatus = INVALID_POSITION_ERROR;
            return false;
        }

        this.x = newPosition.x;
        this.y = newPosition.y;
        this.abnormalStatus = '';
        return true;
    }

    public turnLeft(): boolean {
        if( !this.initiated ) {
            this.abnormalStatus = NOT_INITIATED_ERROR;
            return false;
        }
        if (!isDirectionValid(this.direction)) {
            this.abnormalStatus = INVALID_DIRECTION_ERROR;
            return false;
        }

        const dir: any = Directions.find((item) => item.direction === this.direction);
        this.direction = dir.left;
        this.abnormalStatus = '';
        return true;
    }

    public turnRight(): boolean {
        if( !this.initiated ) {
            this.abnormalStatus = NOT_INITIATED_ERROR;
            return false;
        }
        if (!isDirectionValid(this.direction)) {
            this.abnormalStatus = INVALID_DIRECTION_ERROR;
            return false;
        }

        const dir: any = Directions.find((item) => item.direction === this.direction);
        this.direction = dir.right;
        this.abnormalStatus = '';
        return true;
    }

    public report(): string {
        if( !this.initiated ) {
            this.abnormalStatus = NOT_INITIATED_ERROR;
            return NOT_INITIATED_ERROR;
        }
        const direction = Directions.find(item => item.direction === this.direction);
        
        this.abnormalStatus = '';
        return this.x + "," + this.y + "," + (direction==null?'invalid':direction.label);
    }
}

export const xMin = 0, xMax = 4, yMin = 0, yMax = 4; 

export enum Direction {EAST = 0, SOUTH, WEST, NORTH}

export const Directions = [
    {direction: Direction.EAST, label: "EAST", left: Direction.NORTH, right: Direction.SOUTH}, 
    {direction: Direction.SOUTH, label: "SOUTH", left: Direction.EAST, right: Direction.WEST},
    {direction: Direction.WEST, label: "WEST", left: Direction.SOUTH, right: Direction.NORTH},
    {direction: Direction.NORTH, label: "NORTH", left: Direction.WEST, right: Direction.EAST}
]

export const isLocationValid = (x:number, y:number) => {
    return x >= xMin && x <= xMax && y >= yMin && y <= yMax;
}

export const isDirectionValid = (direction:number) => {
    return Directions.findIndex(item => item.direction === direction) >= 0;
}

export const NOT_INITIATED_ERROR = "Robot is not correctly initiated yet by a Place command with correct values in range";
export const INVALID_POSITION_ERROR = "Caution: new postion is out of table, the robot's position will not be changed";
export const INVALID_DIRECTION_ERROR = "New direction is invalid";