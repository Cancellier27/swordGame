"use strict";
class GameObject {
    constructor(config) {
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.width = config.width;
        this.height = config.height;
        this.currentAnimation = config.currentAnimation;
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src,
            currentAnimation: this.currentAnimation,
            tileSize: config.tileSize,
            useShadow: config.useShadow
        });
        // fix behavior type
        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;
    }
    // mount wall
    mount(map) {
        this.isMounted = true;
        map.addWall(this.x / 16, this.y / 16);
        // if we have a behavior, kick off after a short delay
    }
    update(state) { }
    doBehaviorEvent(map) {
        // check what behavior we are on
        let event = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;
        const eventHandlet = new OverWorldEvent({ map, event: eventConfig });
    }
}
