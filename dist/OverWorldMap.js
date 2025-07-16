"use strict";
class OverWorldMap {
    constructor(config) {
        // references the gameObjects to be used here
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};
        // load the lower image of the map
        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;
        // lower the upper image of the map
        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }
    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(this.lowerImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }
    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(this.upperImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }
    // check if the space ahead is blocked, or taken
    isSpaceTaken(currentX, currentY, direction) {
        const { x, y } = utils.nexPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }
}
