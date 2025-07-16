"use strict";
const utils = {
    withGrid(n) {
        return n * 16;
    },
    asGridCoord(x, y) {
        return `${x * 16},${y * 16}`;
    },
    nexPosition(initialX, initialY, direction) {
        let x = initialX;
        let y = initialY;
        const size = 4;
        // switch (direction) {
        //   case "left":
        //     x -= size
        //     break
        //   case "right":
        //     x += size
        //     break
        //   case "up":
        //     y -= size
        //     break
        //   case "down":
        //     y += size
        //     break
        // }
        if (direction === "left") {
            x -= size;
        }
        else if (direction === "right") {
            x += size;
        }
        else if (direction === "up") {
            y -= size;
        }
        else if (direction === "down") {
            y += size;
        }
        return { x, y };
    }
};
