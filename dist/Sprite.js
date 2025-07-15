"use strict";
class Sprite {
    constructor(config) {
        this.isLoaded = false;
        this.isShadowLoaded = false;
        // set up the image to be used in this sprite
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        };
        // set up shadow image
        this.shadow = new Image();
        this.useShadow = true;
        // control if the asset to be loaded needs a shadow
        if (this.useShadow) {
            this.shadow.src = "../images/characters/shadow.png";
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        };
        // Configure animation and initial state
        this.animations = config.animations || {
            idleDown: [[0, 0]]
        };
        // defines the starting animation frame if not stated
        this.currentAnimation = config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;
        // reference GameObject class to be used here
        this.gameObject = config.gameObject;
    }
    draw(ctx) {
        const x = this.gameObject.x * 16 - 8;
        const y = this.gameObject.y * 16 - 18;
        this.isShadowLoaded &&
            ctx.drawImage(this.shadow, // image element
            x + 8, // destination x
            y + 12 // destination y
            );
        this.isLoaded &&
            ctx.drawImage(this.image, // image element
            0, // left cut
            0, // top cut
            48, // width of cut, size of the sprite frame
            48, // height of cut, size of the sprite frame
            x, // destination x
            y, // destination y
            48, // destination width
            48 // destination height
            );
    }
}
