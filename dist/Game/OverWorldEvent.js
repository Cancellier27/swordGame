"use strict";
class OverWorldEvent {
    constructor(config) {
        this.map = config.map;
        this.event = config.event;
    }
    stand(resolve) {
        if (this.event.who) {
            const who = this.map.gameObjects[this.event.who];
            who.startBehavior({
                map: this.map,
                arrow: this.event.direction
            }, {
                type: "stand",
                direction: this.event.direction,
                time: this.event.time,
                who: this.event.who
            });
        }
        const completeHandler = (e) => {
            const customEvent = e;
            if (customEvent.detail.whoId === this.event.who) {
                document.removeEventListener("PersonStandComplete", completeHandler);
                resolve();
            }
        };
        document.addEventListener("PersonStandComplete", completeHandler);
    }
    walk(resolve) {
        if (this.event.who) {
            const who = this.map.gameObjects[this.event.who];
            who.startBehavior({
                map: this.map,
                arrow: this.event.direction
            }, {
                type: "walk",
                direction: this.event.direction,
                who: this.event.who,
                retry: true
            });
            const completeHandler = (e) => {
                const customEvent = e;
                if (customEvent.detail.whoId === this.event.who) {
                    document.removeEventListener("PersonWalkingComplete", completeHandler);
                    resolve();
                }
            };
            document.addEventListener("PersonWalkingComplete", completeHandler);
        }
    }
    attack(resolve) {
        // fire async event to wait for attack to finish
        const completeHandler = (e) => {
            const customEvent = e;
            if (customEvent.detail.whoId === this.event.who) {
                document.removeEventListener("PersonAttackingComplete", completeHandler);
                resolve();
            }
        };
        document.addEventListener("PersonAttackingComplete", completeHandler);
        // }
    }
    textMessage(resolve) {
        if (this.event.faceHero) {
            const obj = this.map.gameObjects[this.event.faceHero];
            obj.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction);
        }
        if (this.event.text) {
            const message = new TextMessage({
                text: this.event.text,
                onComplete: () => resolve()
            });
            message.init(document.querySelector(".game-container"));
        }
    }
    changeMap(resolve) {
        if (!this.event.map)
            return;
        const sceneTransitionFog = new SceneTransition();
        sceneTransitionFog.init(document.querySelector(".game-container"), () => {
            var _a;
            (_a = this.map.overWorld) === null || _a === void 0 ? void 0 : _a.startMap(this.event.map);
            resolve();
            sceneTransitionFog.fadeOut();
        });
    }
    pause(resolve) {
        this.map.isPaused = true;
        const newPauseInstance = new PauseMenu({
            onComplete: () => {
                var _a, _b;
                resolve();
                this.map.isPaused = false;
                (_a = this.map.overWorld) === null || _a === void 0 ? void 0 : _a.directionInput.init();
                (_b = this.map.overWorld) === null || _b === void 0 ? void 0 : _b.startGameLoop(60);
            }
        });
        newPauseInstance.init();
    }
    init() {
        return new Promise((resolve) => {
            // @ts-ignore
            this[this.event.type](resolve);
        });
    }
}
