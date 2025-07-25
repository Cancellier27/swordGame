"use strict";
class Attack {
    constructor(config) {
        this.player = config.map.gameObjects.hero;
        this.gameObjects = config.map.gameObjects;
        this.map = config.map;
        this.isAttacking = null;
    }
    wasSomeoneHit() {
        const x = this.player.x;
        const y = this.player.y;
        const direction = this.player.direction;
        const entitiesHitPoints = attackRanges.swordNormal(x, y, direction);
        // check if no one is hit and return the func
        if (Object.keys(entitiesHitPoints).length === 0)
            return;
        const entitiesHit = Object.values(this.gameObjects).filter((object) => {
            if (!object.isAttacking) {
                if (entitiesHitPoints.startX <= object.x &&
                    entitiesHitPoints.endX >= object.x &&
                    entitiesHitPoints.startY <= object.y &&
                    entitiesHitPoints.endY >= object.y) {
                    return object;
                }
            }
        });
        entitiesHit.forEach(object => {
            object.startBehavior({
                arrow: direction,
                map: this.map
            }, {
                type: "push",
                direction: direction
            });
        });
    }
    init() {
        this.isAttacking = new KeyPressListener("Space", () => {
            this.player.isAttacking = true;
            this.wasSomeoneHit();
        });
    }
}
