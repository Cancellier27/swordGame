"use strict";
const utils = {
    withGrid(n) {
        return n * 16;
    },
    asGridCoord(x, y) {
        return `${x * 4},${y * 4}`;
    },
    nextPosition(initialX, initialY, direction) {
        let topLX = initialX;
        let topLY = initialY;
        let topRX = initialX + 16;
        let topRY = initialY;
        let botLX = initialX;
        let botLY = initialY + 16;
        let botRX = initialX + 16;
        let botRY = initialY + 16;
        // console.log(`${x},${y}`)
        const size = 4;
        // prettier-ignore
        if (direction === "left") {
            topLX -= size;
            botLX -= size;
            return [[topLX, topLY], [botLX, botLY]];
        }
        else if (direction === "right") {
            topRX += size;
            botRX += size;
            return [[topRX, topRY], [botRX, botRY]];
        }
        else if (direction === "up") {
            topLY -= size;
            topRY -= size;
            return [[topLX, topLY], [topRX, topRY]];
        }
        else if (direction === "down") {
            botLY += size;
            botRY += size;
            return [[botLX, botLY], [botRX, botRY]];
        }
        else if (direction === "left-up" || direction === "up-left") {
            topLX -= size;
            botLX -= size;
            topLY -= size;
            topRY -= size;
            topRX -= size;
            botLY -= size;
            return [[topLX, topLY], [topRX, topRY], [botLX, botLY]];
        }
        else if (direction === "left-down" || direction === "down-left") {
            topLX -= size;
            topLY += size;
            botLX -= size;
            botLY += size;
            botRX -= size;
            botRY += size;
            return [[topLX, topLY], [botRX, botRY], [botLX, botLY]];
        }
        else if (direction === "right-down" || direction === "down-right") {
            topRX += size;
            topRY += size;
            botLX += size;
            botLY += size;
            botRX += size;
            botRY += size;
            return [[topRX, topRY], [botRX, botRY], [botLX, botLY]];
        }
        else if (direction === "right-up" || direction === "up-right") {
            topRX += size;
            topRY -= size;
            topLX += size;
            topLY -= size;
            botRX += size;
            botRY -= size;
            return [[topRX, topRY], [botRX, botRY], [topLX, topLY]];
        }
    },
    createMapWalls(wallsArr, walls) {
        wallsArr.forEach((wall) => {
            let x = wall[0] * 16; //tile X
            let y = wall[1] * 16; //tile Y
            // ref point wall
            walls[`${x},${y}`] = true; // 0x0 <-
            // left wall
            walls[`${x},${y + 4}`] = true; // 0x4
            walls[`${x},${y + 8}`] = true; // 0x8
            walls[`${x},${y + 12}`] = true; // 0x12
            walls[`${x},${y + 16}`] = true; // 0x16 <-
            // bottom wall
            walls[`${x + 4},${y + 16}`] = true; // 4x16
            walls[`${x + 8},${y + 16}`] = true; // 8x16
            walls[`${x + 12},${y + 16}`] = true; // 12x16
            walls[`${x + 16},${y + 16}`] = true; // 16x16 <-
            // right wall
            walls[`${x + 16},${y + 12}`] = true; // 16x12
            walls[`${x + 16},${y + 8}`] = true; // 16x8
            walls[`${x + 16},${y + 4}`] = true; // 16x4
            walls[`${x + 16},${y}`] = true; // 16x0 <-
            // top wall
            walls[`${x + 12},${y}`] = true; // 12x0
            walls[`${x + 8},${y}`] = true; // 8x0
            walls[`${x + 4},${y}`] = true; // 4x0
        });
    }
};
