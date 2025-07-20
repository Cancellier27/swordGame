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
    init() {
        return new Promise((resolve) => {
            // @ts-ignore
            this[this.event.type](resolve);
        });
    }
}
