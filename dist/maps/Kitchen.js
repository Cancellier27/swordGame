"use strict";
const Kitchen = {
    lowerSrc: "../images/maps/KitchenLower.png",
    upperSrc: "../images/maps/KitchenUpper.png",
    gameObjects: {
        hero: new Person({
            x: utils.withGrid(5),
            y: utils.withGrid(5),
            isPlayerControlled: true,
            currentAnimation: "idle-down",
            direction: "down",
            src: "../images/characters/people/player.png",
            tileSize: 48,
            useShadow: false,
            width: 16,
            height: 16
        }),
        slime_1: new Person({
            x: utils.withGrid(10),
            y: utils.withGrid(8),
            isPlayerControlled: false,
            currentAnimation: "idle-down",
            direction: "down",
            src: "../images/characters/people/slime.png",
            tileSize: 32,
            useShadow: false,
            width: 16,
            height: 16,
            talking: [
                {
                    events: [
                        { type: "textMessage", text: "Hey!", faceHero: "slime_1" },
                        { type: "textMessage", text: "You've made it!" }
                    ]
                }
            ]
        })
    },
    walls: {},
    cutsceneSpaces: {
        [utils.inlinePoints(5, 10)]: [
            {
                events: [{ type: "changeMap", map: "TestMap" }]
            }
        ]
    },
    collisionData: [
        [169, 169, 169, 169, 169, 169, 169, 169, 169, 169, 169, 169, 169, 169],
        [169, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 169],
        [169, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 169],
        [169, 169, 169, 169, 169, 169, 169, 169, 169, 169, 169, 0, 0, 169],
        [169, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 169, 169, 169],
        [169, 169, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 169],
        [169, 169, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 169],
        [169, 169, 0, 0, 0, 0, 169, 169, 0, 169, 169, 0, 0, 169],
        [169, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 169],
        [169, 169, 169, 0, 0, 0, 0, 0, 0, 169, 169, 0, 0, 169],
        [169, 169, 169, 169, 169, 0, 169, 169, 169, 169, 169, 169, 169, 169],
        [169, 169, 169, 169, 169, 169, 169, 169, 169, 169, 169, 169, 169, 169]
    ]
};
