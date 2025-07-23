"use strict";
class Attack {
    constructor(config) {
        this.player = config.map.gameObjects.hero;
        this.isAttacking = null;
    }
    init() {
        this.isAttacking = new KeyPressListener("Space", () => {
            this.player.isAttacking = true;
        });
    }
}
