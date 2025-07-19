"use strict";
class Protagonist extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0;
        this.isPlayerControlled = config.isPlayerControlled;
        // prettier-ignore
        this.directionUpdate = {
            "up": [["y", -1]],
            "down": [["y", 1]],
            "left": [["x", -1]],
            "right": [["x", 1]],
            "up-right": [["x", 1], ["y", -1]],
            "right-up": [["x", 1], ["y", -1]],
            "down-right": [["x", 1], ["y", 1]],
            "right-down": [["x", 1], ["y", 1]],
            "up-left": [["x", -1], ["y", -1]],
            "left-up": [["x", -1], ["y", -1]],
            "down-left": [["x", -1], ["y", 1]],
            "left-down": [["x", -1], ["y", 1]],
        };
    }
    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        }
        else {
            // more cases to start to walk wil come here
            // arrow comes from the direction input event listener defined in overWorld gameLoop.
            // if not player, it won't move
            if (this.isPlayerControlled && state.arrow) {
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow
                });
            }
            this.updateSprite();
        }
    }
    startBehavior(state, behavior) {
        // set the character to walk or do some behavior
        this.direction = behavior.direction;
        if (behavior.type === "walk") {
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                const validDiagonalMovements = [
                    "up-right",
                    "right-up",
                    "down-right",
                    "right-down",
                    "up-left",
                    "left-up",
                    "down-left",
                    "left-down"
                ];
                if (validDiagonalMovements.includes(this.direction)) {
                    const dir = this.direction.split("-");
                    if (!state.map.isSpaceTaken(this.x, this.y, dir[0])) {
                        this.direction = dir[0];
                    }
                    else if (!state.map.isSpaceTaken(this.x, this.y, dir[1])) {
                        this.direction = dir[1];
                    }
                    else {
                        return;
                    }
                }
                else {
                    // if space is taken ahead, return and do not move
                    return;
                }
            }
            // set a wall onto the next space here will be
            state.map.moveWall(this.x, this.y, this.direction);
            // keep walking!
            this.movingProgressRemaining = 4;
        }
    }
    // update player position and movingProgressRemaining
    updatePosition() {
        // get the this.direction from the extended obj GameObject to get the right directionUpdate value
        if (this.directionUpdate[this.direction].length > 1) {
            const [_x, changeX] = this.directionUpdate[this.direction][0];
            const [_y, changeY] = this.directionUpdate[this.direction][1];
            this.x += changeX;
            this.y += changeY;
        }
        else {
            const [property, change] = this.directionUpdate[this.direction][0];
            if (property === "x") {
                ;
                this.x += change;
            }
            else if (property === "y") {
                ;
                this.y += change;
            }
        }
        this.movingProgressRemaining -= 1;
    }
    updateSprite() {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction);
            return;
        }
        if (this.direction.includes("-")) {
            let splitDir = this.direction.split("-")[0];
            this.sprite.setAnimation("idle-" + splitDir);
        }
        else {
            this.sprite.setAnimation("idle-" + this.direction);
        }
    }
}
