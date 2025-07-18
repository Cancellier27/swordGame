"use strict";
const { Engine, World } = Matter;
class PhysicsEngine {
    constructor() {
        this.engine = Engine.create();
        this.world = this.engine.world;
        // You can set gravity here if needed
        this.world.gravity.y = 0;
    }
    update(deltaTime) {
        Engine.update(this.engine, deltaTime);
    }
    listenForCollisions(map) {
        Events.on(this.engine, "collisionStart", function (event) {
            map.isColliding = true;
        });
        Events.on(this.engine, "collisionEnd", function (event) {
            map.isColliding = false;
        });
    }
    init() {
        Matter.Runner.run(Matter.Runner.create(), this.engine);
    }
}
