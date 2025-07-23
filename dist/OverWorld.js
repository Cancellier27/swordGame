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
        // this.map = "toBeAssigned"
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
            object.update({
                arrow: this.directionInput.direction,
                map: this.map
            });
        });
        // Draw LOWER tiles layer
        this.map.drawLowerImage(this.ctx, cameraPerson);
        // Draw players and NPCs using y value as order
        Object.values(this.map.gameObjects)
            .sort((a, b) => {
            return a.y - b.y;
        })
            .forEach((object) => {
            object.sprite.draw(this.ctx, cameraPerson);
        });
        // Draw UPPER tiles layer
        this.map.drawUpperImage(this.ctx, cameraPerson);
        // COLLISION WALLS FOR DEBUGGING
        // this.map.drawCollisionPoints(this.ctx, cameraPerson)
    }
    bindActionInput() {
        new KeyPressListener("Enter", () => {
            // is there any NPC here to talk to?
            this.map.checkForActionCutscene();
        });
    }
    bindHeroPositionCheck() {
        document.addEventListener("PersonWalkingComplete", (e) => {
            const event = e;
            if (event.detail.whoId === "hero") {
                // check if here have stepped into a cutscene spot.
                this.map.checkForFootstepCutscene();
            }
        });
    }
    startMap(mapConfig) {
        const maps = {
            TestMap: TestMap,
            Kitchen: Kitchen
        };
        this.map = new OverWorldMap(maps[mapConfig]);
        this.map.overWorld = this;
        // mount objects walls
        this.map.mountObjects();
    }
    init() {
        this.startMap("TestMap");
        this.bindActionInput();
        this.bindHeroPositionCheck();
        // create and initializes the class DirectionInput to listen to keyboard press
        this.directionInput = new DirectionInputs();
        this.directionInput.init();
        // start game loop
        this.startGameLoop(60);
        // max text size
        // this.map.startCutscene([
        //   {
        //     type: "textMessage",
        //     text: "Hello There! how are you doing today? Hello There! how are you doing today? Hello There! how are you doing today? Hello There!"
        //   }
        // ])
    }
}
