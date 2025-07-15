"use strict";
class OverWorldMap {
    constructor(config) {
        // references the gameObjects to be used here
        this.gameObjects = config.gameObjects;
        // load the lower image of the map
        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;
        // lower the upper image of the map
        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }
    drawLowerImage(ctx) {
        ctx.drawImage(this.lowerImage, 0, 0);
    }
    drawUpperImage(ctx) {
        ctx.drawImage(this.upperImage, 0, 0);
    }
}
