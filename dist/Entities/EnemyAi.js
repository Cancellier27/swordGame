"use strict";
class EnemyAi {
    constructor(gameObjects) {
        this.gameObjects = gameObjects;
        this.movementDelay = 0;
    }
    chase(who, map) {
        // coordinates of who to chase
        let whoX = who.x;
        let whoY = who.y;
        // console.log(who.movingProgressRemaining)
        Object.keys(this.gameObjects).forEach((chasingKey) => {
            if (chasingKey !== "hero") {
                // enemy coordinates
                let object = this.gameObjects[chasingKey];
                let chasingX = object.x;
                let chasingY = object.y;
                const getDirection = utils.getChaseDirection(whoX, whoY, chasingX, chasingY);
                if (object.movingProgressRemaining > 0) {
                    object.updatePosition();
                }
                else {
                    if (object.id) {
                        object.startBehavior({
                            map: map,
                            arrow: getDirection
                        }, {
                            type: "walk",
                            direction: getDirection,
                            who: object.id
                        });
                    }
                }
                // object.updateSprite()
            }
        });
    }
    init() { }
}
