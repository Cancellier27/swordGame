"use strict";
const { Bodies } = Matter;
class GameObject {
    constructor(config) {
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.width = config.width;
        this.height = config.height;
        this.world = config.world;
        this.type = config.type;
        this.body = null;
        this.tileSize = config.tileSize;
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src,
            currentAnimation: config.currentAnimation,
            tileSize: config.tileSize,
            useShadow: config.useShadow
        });
    }
    createPhysicalBody(cameraman) {
        // create the physical body around the players and npcs
        this.body = Bodies.rectangle(this.x + utils.withGrid(10.5) - cameraman.x, this.y + 3 + utils.withGrid(6) - cameraman.y, this.width, this.height, {
            restitution: 0.1,
            friction: 0.05,
            label: this.type
        });
        World.add(this.world, this.body);
    }
    // mount wall
    mount(map) {
        this.isMounted = true;
        map.addWall(this.x, this.y);
    }
    update(state) { }
}
