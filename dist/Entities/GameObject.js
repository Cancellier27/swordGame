"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class GameObject {
    constructor(config) {
        this.isAlive = true;
        this.vanished = false;
        this.isActive = true;
        this.isStanding = false;
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction;
        this.direction = config.direction;
        this.vanishDuration = config.vanishDuration || 500;
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src,
            currentAnimation: config.currentAnimation,
            tileSize: config.tileSize,
            useShadow: config.useShadow,
            vanishDuration: config.vanishDuration || 500
        });
        // fix behavior type
        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;
        this.talking = config.talking || [];
        this.isAttacking = false;
    }
    // mount objects, called only once
    mount(map) {
        this.isMounted = true;
        map.addWall(this.x / 16, this.y / 16);
        // if we have a behavior, kick off after a short delay
        setTimeout(() => {
            if (this.isActive) {
                this.doBehaviorEvent(map);
            }
        }, 10);
    }
    unmount() {
        this.isActive = false;
    }
    update(state) { }
    startBehavior(state, behavior) { }
    //  do not do anything is there is no behavior loop
    doBehaviorEvent(map) {
        return __awaiter(this, void 0, void 0, function* () {
            if (map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding || !this.isActive) {
                console.log(`${this.id}: Return`);
                return;
            }
            // check what behavior we are on
            let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
            eventConfig.who = this.id;
            // if (!this.isActive) return
            // create an event instance of our event config
            if (eventConfig.type === "walk") {
                // create for instances of walking to compensate the 16x16 grid used, as the character only walks 4 pixel per frame.
                for (let i = 0; i < 4; i++) {
                    const eventHandler = new OverWorldEvent({ map, event: eventConfig });
                    yield eventHandler.init();
                }
            }
            else {
                const eventHandler = new OverWorldEvent({ map, event: eventConfig });
                yield eventHandler.init();
            }
            console.log("done");
            // go to the next loop
            this.behaviorLoopIndex += 1;
            // reset the behavior loop
            if (this.behaviorLoopIndex === this.behaviorLoop.length) {
                this.behaviorLoopIndex = 0;
            }
            // do it again!
            if (this.isActive) {
                this.doBehaviorEvent(map);
            }
        });
    }
}
