"use strict";
const attackRanges = {
    entityHitPoints(x, y) {
        const points = {};
        for (let i = 1; i < 5; i++) {
            for (let j = 1; j < 5; j++) {
                points[`${x * i},${y * j}`] = true;
            }
        }
        return points;
    },
    swordSwing(x, y, direction) {
        const points = {};
        if (direction === "right") {
            ;
            (points["startX"] = x + 16), (points["endX"] = x + 24), (points["startY"] = y - 8);
            points["endY"] = y + 24;
        }
        else if (direction === "left") {
            ;
            (points["startX"] = x - 24), (points["endX"] = x - 16), (points["startY"] = y - 8);
            points["endY"] = y + 24;
        }
        else if (direction === "up") {
            ;
            (points["startX"] = x - 8), (points["endX"] = x + 24), (points["startY"] = y - 24);
            points["endY"] = y - 16;
        }
        else if (direction === "down") {
            ;
            (points["startX"] = x - 8), (points["endX"] = x + 24), (points["startY"] = y + 16);
            points["endY"] = y + 24;
        }
        return points;
    }
};
