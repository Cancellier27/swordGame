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
        // prettier-ignore
        this.animations = config.animations || {
            "idle-down": [[0, 0]],
            "walk-down": [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3]]
        };
        // defines the starting animation frame if not stated
        this.currentAnimation = "walk-down"; //config.currentAnimation || "idle-down"
        this.currentAnimationFrame = 0;
        // defines the animation time, for the npcs to walk
        this.animationFrameLimit = config.animationFrameLimit || 16;
        this.animationFrameLimitProgress = this.animationFrameLimit;
        // reference GameObject class to be used here
        this.gameObject = config.gameObject;
    }
    // gets the animation frame that the player is on.
    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }
    updateAnimationProgress() {
        // downtick frame progress, if animationFrameLimitProgress is not 0, do not update anything
        if (this.animationFrameLimitProgress > 0) {
            this.animationFrameLimitProgress -= 1;
            return;
        }
        // reset the counter if animationFrameLimitProgress is 0
        this.animationFrameLimitProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;
        // reset the animation frame to the first one
        if (this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }
    }
    draw(ctx) {
        const x = this.gameObject.x - 8;
        const y = this.gameObject.y - 18;
        this.isShadowLoaded &&
            ctx.drawImage(this.shadow, // image element
            x + 8, // destination x
            y + 12 // destination y
            );
        const [frameX, frameY] = this.frame;
        this.isLoaded &&
            ctx.drawImage(this.image, // image element
            frameX * 48, // left cut
            frameY * 48, // top cut
            48, // width of cut, size of the sprite frame
            48, // height of cut, size of the sprite frame
            x, // destination x
            y, // destination y
            48, // destination width
            48 // destination height
            );
        this.updateAnimationProgress();
    }
}
