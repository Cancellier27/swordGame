"use strict";
class OverWorld {
    constructor(config) {
        this.element = config.element;
        const canvas = this.element.querySelector(".game-canvas");
        if (!canvas) {
            throw new Error('Canvas element with class "game-canvas" not found.');
        }
        this.canvas = canvas;
        const ctx = this.canvas.getContext("2d");
        if (!ctx) {
            throw new Error("2D rendering context not supported or canvas already initialized.");
        }
        this.ctx = ctx;
        this.gamePhysics = new PhysicsEngine();
        this.world = this.gamePhysics.world;
    }
    startGameLoop(fps) {
        let previousMs = undefined;
        // loop at X fps, 60 in this game
        const step = 1 / fps;
        const tick = (timestampMs) => {
            // for later on in the code
            // if (this.hasStopped) {
            //   return
            // }
            if (previousMs === undefined) {
                previousMs = timestampMs;
            }
            let delta = (timestampMs - previousMs) / 1000;
            while (delta >= step) {
                this.loop();
                delta -= step;
            }
            previousMs = timestampMs - delta * 1000;
            // recalls the loop tick func
            requestAnimationFrame(tick);
        };
        // initial kick off!
        requestAnimationFrame(tick);
    }
    loop() {
        // what to update during the loop to be put here
        // clear the canvas every time the loop runs, before drawing onto screen.
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Establish the camera person
        const cameraPerson = this.map.gameObjects.hero;
        // update all objects (for a big game this part here will generate performance issues)
        Object.values(this.map.gameObjects).forEach((object) => {
            let x = 0;
            let y = 0;
            if (object.tileSize === 48) {
                x = object.x + utils.withGrid(10.5) - cameraPerson.x;
                y = object.y + 3 + utils.withGrid(6) - cameraPerson.y;
            }
            else {
                x = object.x - 8 + utils.withGrid(10.5) - cameraPerson.x;
                y = object.y - 13 + utils.withGrid(6) - cameraPerson.y;
            }
            if (object.body) {
                Matter.Body.setPosition(object.body, { x: x, y: y });
            }
            object.update({
                arrow: this.directionInput.direction,
                map: this.map
            });
        });
        // Draw LOWER tiles layer
        this.map.drawLowerImage(this.ctx, cameraPerson);
        // players and NPCs
        Object.values(this.map.gameObjects).forEach((object) => {
            object.sprite.draw(this.ctx, cameraPerson);
            if (object.body) {
                this.map.drawBodies(this.ctx, cameraPerson, object.body, object.width, object.height);
            }
        });
        // Draw UPPER tiles layer
        this.map.drawUpperImage(this.ctx, cameraPerson);
    }
    createBodies(map) {
        const cameraman = { x: map.gameObjects.hero.x, y: map.gameObjects.hero.y };
        Object.values(map.gameObjects).forEach((object) => {
            object.createPhysicalBody(cameraman);
        });
    }
    init() {
        this.map = new OverWorldMap({
            lowerSrc: "../images/maps/BosqueLower.png",
            upperSrc: "../images/maps/BosqueUpper.png",
            gameObjects: {
                hero: new Protagonist({
                    type: "player",
                    x: utils.withGrid(45),
                    y: utils.withGrid(24),
                    isPlayerControlled: true,
                    currentAnimation: "idle-down",
                    src: "../images/characters/people/player.png",
                    tileSize: 48,
                    useShadow: true,
                    width: 15,
                    height: 21,
                    world: this.world
                }),
                slime: new NPC({
                    type: "npc",
                    x: utils.withGrid(40),
                    y: utils.withGrid(22),
                    isPlayerControlled: true,
                    currentAnimation: "walk-up",
                    src: "../images/characters/people/slime.png",
                    tileSize: 32,
                    useShadow: false,
                    width: 20,
                    height: 12,
                    world: this.world
                })
            },
            // walls that player can collide with
            walls: {
            // [utils.asGridCoord(42, 26)]: true,
            // [utils.asGridCoord(43, 23)]: true,
            // [utils.asGridCoord(44, 23)]: true,
            // [utils.asGridCoord(35, 23)]: true,
            // [utils.asGridCoord(36, 23)]: true,
            // [utils.asGridCoord(37, 23)]: true
            }
        });
        // this.map.mountObjects()
        // create and initializes the class DirectionInput to listen to keyboard press
        this.directionInput = new DirectionInputs();
        this.directionInput.init();
        // create npc and player physical bodies
        this.createBodies(this.map);
        // start Listening for collisions
        this.gamePhysics.init();
        this.gamePhysics.listenForCollisions(this.map);
        // start game loop
        this.startGameLoop(60);
    }
}
