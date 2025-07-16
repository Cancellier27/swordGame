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
        this.useShadow = config.useShadow;
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
            // idle
            "idle-up": [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]],
            "idle-down": [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1]],
            "idle-right": [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2]],
            "idle-left": [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3]],
            // walking straight
            "walk-up": [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4]],
            "walk-down": [[0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5]],
            "walk-right": [[0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]],
            "walk-left": [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7]],
            // walking diagonally
            "walk-up-right": [[0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]],
            "walk-right-up": [[0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]],
            "walk-down-right": [[0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]],
            "walk-right-down": [[0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]],
            "walk-up-left": [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7]],
            "walk-left-up": [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7]],
            "walk-down-left": [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7]],
            "walk-left-down": [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7]],
            // attacking
            "attack-up": [[0, 8], [1, 8], [2, 8], [3, 8]],
            "attack-down": [[0, 9], [1, 9], [2, 9], [3, 9]],
            "attack-right": [[0, 10], [1, 10], [2, 10], [3, 10]],
            "attack-left": [[0, 11], [1, 11], [2, 11], [3, 11]],
            // dyeing
            "die-right": [[0, 12], [1, 12], [2, 12], [3, 12], [3, 12]],
            "die-left": [[0, 13], [1, 13], [2, 13], [3, 13], [3, 13]]
        };
        // defines the starting animation frame if not stated
        this.currentAnimation = config.currentAnimation;
        this.currentAnimationFrame = 0;
        // defines the animation time, for the NPCs to walk
        this.animationFrameLimit = config.animationFrameLimit || 8;
        this.animationFrameLimitProgress = this.animationFrameLimit;
        // get the tile size for the sprite
        this.tileSize = config.tileSize;
        // reference GameObject class to be used here
        this.gameObject = config.gameObject;
    }
    // gets the animation frame that the player is on.
    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }
    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameLimitProgress = this.animationFrameLimit;
        }
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
    draw(ctx, cameraPerson) {
        const x = this.gameObject.x - 24 + utils.withGrid(10.5) - cameraPerson.x;
        const y = this.gameObject.y - 29 + utils.withGrid(6) - cameraPerson.y;
        this.isShadowLoaded &&
            ctx.drawImage(this.shadow, // image element
            x + 8, // destination x
            y + 12 // destination y
            );
        const [frameX, frameY] = this.frame;
        this.isLoaded &&
            ctx.drawImage(this.image, // image element
            frameX * this.tileSize, // left cut
            frameY * this.tileSize, // top cut
            this.tileSize, // width of cut, size of the sprite frame
            this.tileSize, // height of cut, size of the sprite frame
            x, // destination x
            y, // destination y
            this.tileSize, // destination width
            this.tileSize // destination height
            );
        this.updateAnimationProgress();
    }
}
