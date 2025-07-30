"use strict";
class EnemyAi {
    constructor(gameObjects) {
        this.gameObjects = gameObjects;
    }
    chase(who, map) {
        // coordinates of who to chase
        let whoX = who.x;
        let whoY = who.y;
        Object.keys(this.gameObjects).forEach((enemyKey) => {
            // enemy coordinates
            let enemyX = this.gameObjects[enemyKey].x;
            let enemyY = this.gameObjects[enemyKey].y;
            if (enemyKey !== "hero") {
                this.gameObjects[enemyKey].startBehavior({ arrow: "right", map: map }, {
                    type: "walk",
                    direction: "right",
                    who: enemyKey
                });
            }
        });
    }
    init() { }
}
