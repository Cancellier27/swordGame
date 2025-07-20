"use strict";
class OverWorldEvent {
    constructor(config) {
        this.map = config.map;
        this.event = config.event;
    }
    stand(resolve) {
        // Implement stand logic here
        resolve();
    }
    walk(resolve) {
        const who = this.map.gameObjects[this.event.who];
        who.startBehavior({
            map: this.map,
            arrow: this.event.direction
        }, {
            type: "walk",
            direction: this.event.direction
        }, 16);
        const completeHandler = (e) => {
            const customEvent = e;
            if (customEvent.detail.whoId === this.event.who) {
                document.removeEventListener("PersonWalkingComplete", completeHandler);
                resolve();
            }
        };
        document.addEventListener("PersonWalkingComplete", completeHandler);
    }
    init() {
        return new Promise((resolve) => {
            // @ts-ignore
            this[this.event.type](resolve);
        });
    }
}
