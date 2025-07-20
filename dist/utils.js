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
            return [[topLX, topLY], [botLX, botLY], [topLX, topLY + 8]];
        }
        else if (direction === "right") {
            topRX += size;
            botRX += size;
            return [[topRX, topRY], [botRX, botRY], [topRX, topRY + 8]];
        }
        else if (direction === "up") {
            topLY -= size;
            topRY -= size;
            return [[topLX, topLY], [topRX, topRY], [topLX + 8, topLY]];
        }
        else if (direction === "down") {
            botLY += size;
            botRY += size;
            return [[botLX, botLY], [botRX, botRY], [botLX + 8, botLY]];
        }
        else if (direction === "left-up" || direction === "up-left") {
            topLX -= size;
            botLX -= size;
            topLY -= size;
            topRY -= size;
            topRX -= size;
            botLY -= size;
            return [[topLX, topLY], [topRX, topRY], [botLX, botLY], [topLX + 8, topLY], [topLX, topLY + 8]];
        }
        else if (direction === "left-down" || direction === "down-left") {
            topLX -= size;
            topLY += size;
            botLX -= size;
            botLY += size;
            botRX -= size;
            botRY += size;
            return [[topLX, topLY], [botRX, botRY], [botLX, botLY], [botLX + 8, botLY], [botLX, botLY - 8]];
        }
        else if (direction === "right-down" || direction === "down-right") {
            topRX += size;
            topRY += size;
            botLX += size;
            botLY += size;
            botRX += size;
            botRY += size;
            return [[topRX, topRY], [botRX, botRY], [botLX, botLY], [botRX - 8, botRY], [botRX, botRY - 8]];
        }
        else if (direction === "right-up" || direction === "up-right") {
            topRX += size;
            topRY -= size;
            topLX += size;
            topLY -= size;
            botRX += size;
            botRY -= size;
            return [[topRX, topRY], [botRX, botRY], [topLX, topLY], [topRX - 8, topRY], [topRX, topRY + 8]];
        }
    },
    nextPositionOrigin(initialX, initialY, direction) {
        let topLX = initialX;
        let topLY = initialY;
        const size = 4;
        if (direction === "left") {
            topLX -= size;
        }
        else if (direction === "right") {
            topLX += size;
        }
        else if (direction === "up") {
            topLY -= size;
        }
        else if (direction === "down") {
            topLY += size;
        }
        else if (direction === "left-up" || direction === "up-left") {
            topLX -= size;
            topLY -= size;
        }
        else if (direction === "left-down" || direction === "down-left") {
            topLX -= size;
            topLY += size;
        }
        else if (direction === "right-down" || direction === "down-right") {
            topLX += size;
            topLY += size;
        }
        else if (direction === "right-up" || direction === "up-right") {
            topLX += size;
            topLY -= size;
        }
        return { topLX, topLY };
    },
    createMapWalls(wallsArr, walls) {
        // wallsArr.forEach((wall: number[]) => {
        let x = wallsArr[0] * 16; //tile X
        let y = wallsArr[1] * 16; //tile Y
        // left wall
        walls[`${x + 4},${y + 4}`] = true; // 4x4 <-
        walls[`${x + 4},${y + 8}`] = true; // 4x8
        walls[`${x + 4},${y + 12}`] = true; // 4x12 <-
        // bottom wall
        walls[`${x + 8},${y + 12}`] = true; // 12x12
        walls[`${x + 12},${y + 12}`] = true; // 12x12 <-
        // right wall
        walls[`${x + 12},${y + 8}`] = true; // 12x8
        walls[`${x + 12},${y + 4}`] = true; // 12x4 <-
        // top wall
        walls[`${x + 8},${y + 4}`] = true; // 12x0
        // })
    },
    removeMapWalls(wallsArr, walls) {
        // wallsArr.forEach((wall: number[]) => {
        let x = wallsArr[0] * 16; //tile X
        let y = wallsArr[1] * 16; //tile Y
        // left wall
        delete walls[`${x + 4},${y + 4}`]; // 4x4 <-
        delete walls[`${x + 4},${y + 8}`]; // 4x8
        delete walls[`${x + 4},${y + 12}`]; // 4x12 <-
        // bottom wall
        delete walls[`${x + 8},${y + 12}`]; // 12x12
        delete walls[`${x + 12},${y + 12}`]; // 12x12 <-
        // right wall
        delete walls[`${x + 12},${y + 8}`]; // 12x8
        delete walls[`${x + 12},${y + 4}`]; // 12x4 <-
        // top wall
        delete walls[`${x + 8},${y + 4}`]; // 12x0
        // })
    },
    emitEvent(name, detail) {
        const event = new CustomEvent(name, {
            detail
        });
        document.dispatchEvent(event);
    }
};
