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
        this.isStanding = false;
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction;
        this.width = config.width;
        this.height = config.height;
        this.direction = config.direction;
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src,
            currentAnimation: config.currentAnimation,
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
        setTimeout(() => {
            this.doBehaviorEvent(map);
        }, 10);
    }
    update(state) { }
    startBehavior(state, behavior) { }
    //  do not do anything is there is no behavior loop
    doBehaviorEvent(map) {
        return __awaiter(this, void 0, void 0, function* () {
            if (map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding) {
                return;
            }
            // check what behavior we are on
            let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
            eventConfig.who = this.id;
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
            // go to the next loop
            this.behaviorLoopIndex += 1;
            // reset the behavior loop
            if (this.behaviorLoopIndex === this.behaviorLoop.length) {
                this.behaviorLoopIndex = 0;
            }
            // do it again!
            this.doBehaviorEvent(map);
        });
    }
}
