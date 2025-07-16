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
        this.mountMapWalls();
    }
    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(this.lowerImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }
    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(this.upperImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }
    // mountObjects() {
    //   Object.values(this.gameObjects).forEach((object) => {
    //     // TODO, determine if this element should really mount
    //     object.mount(this)
    //   })
    // }
    mountMapWalls() {
        utils.createMapWalls([[42, 26]], this.walls);
        // utils.createMapWalls([[42,26],[43,23],[44,23],[35,23],[36,23],[37,23]], this.walls)
    }
    isSpaceTaken(currentX, currentY, direction) {
        const { x, y } = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }
    // walls functions, add, remove and move
    addWall(x, y) {
        this.walls[`${x},${y}`] = true;
    }
    removeWall(x, y) {
        delete this.walls[`${x},${y}`];
    }
    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const { x, y } = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x, y);
    }
}
