"use strict";
class DirectionInputs {
    constructor() {
        this.heldDirections = [];
        // arrow sent for direction the character needs to move
        this.directionMap = {
            ArrowUp: "up",
            KeyW: "up",
            ArrowDown: "down",
            KeyS: "down",
            ArrowRight: "right",
            KeyD: "right",
            ArrowLeft: "left",
            KeyA: "left"
        };
    }
    // acts like a value from the class but it is dynamic and always will have the 0 value from the heldDirections array
    get direction() {
        return this.heldDirections[0];
    }
    init() {
        // event listener for when a key is pressed to ADD that arrow value into the helDirections array
        document.addEventListener("keydown", (e) => {
            const dir = this.directionMap[e.code];
            const index = this.heldDirections.indexOf(dir);
            if (dir && index === -1) {
                this.heldDirections.unshift(dir);
            }
        });
        // event listener for when a key is pressed to REMOVE that arrow value into the helDirections array
        document.addEventListener("keyup", (e) => {
            const dir = this.directionMap[e.code];
            const index = this.heldDirections.indexOf(dir);
            if (dir && index > -1) {
                this.heldDirections.splice(index, 1);
            }
        });
    }
}
