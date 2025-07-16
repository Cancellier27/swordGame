"use strict";
class Protagonist extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0;
        this.isPlayerControlled = config.isPlayerControlled || false;
        this.directionUpdate = {
            up: ["y", -1],
            down: ["y", 1],
            left: ["x", -1],
            right: ["x", 1]
        };
    }
    update(state) {
        this.updatePosition();
        // arrow comes from the direction input event listener defined in overWorld gameLoop.
        // if not player, it won't move
        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) {
            this.direction = state.arrow;
            this.movingProgressRemaining = 16;
        }
    }
    // update player position and movingProgressRemaining
    updatePosition() {
        if (this.movingProgressRemaining > 0) {
            // get the this.direction from the extended obj GameObject to get the right directionUpdate value
            const [property, change] = this.directionUpdate[this.direction];
            if (property === "x") {
                ;
                this.x += change;
            }
            else if (property === "y") {
                ;
                this.y += change;
            }
            this.movingProgressRemaining -= 1;
        }
    }
}
