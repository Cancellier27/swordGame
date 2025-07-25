"use strict";
const TestMap = {
    lowerSrc: "../images/maps/TestMap_lower.png",
    upperSrc: "../images/maps/TestMap_upper.png",
    gameObjects: {
        hero: new Person({
            x: utils.withGrid(10),
            y: utils.withGrid(17),
            isPlayerControlled: true,
            currentAnimation: "idle-down",
            direction: "down",
            src: "../images/characters/people/player.png",
            tileSize: 48,
            useShadow: true,
            width: 16,
            height: 16
        }),
        slime_1: new Person({
            x: utils.withGrid(14),
            y: utils.withGrid(18),
            isPlayerControlled: false,
            currentAnimation: "idle-down",
            direction: "down",
            src: "../images/characters/people/slime.png",
            tileSize: 32,
            useShadow: false,
            width: 16,
            height: 16,
            behaviorLoop: [
                { type: "stand", direction: "up", time: 800 },
                { type: "stand", direction: "right", time: 1800 },
                { type: "stand", direction: "down", time: 1500 },
                { type: "stand", direction: "left", time: 2500 }
            ],
            talking: [
                {
                    events: [
                        { type: "textMessage", text: "Hey!", faceHero: "slime_1" },
                        { type: "textMessage", text: "Get out of my way!" }
                    ]
                }
            ]
        })
        // npcA: new Person({
        //   x: utils.withGrid(19),
        //   y: utils.withGrid(13),
        //   isPlayerControlled: false,
        //   currentAnimation: "idle-down",
        //   direction: "down",
        //   src: "../images/characters/people/player.png",
        //   tileSize: 48,
        //   useShadow: false,
        //   width: 16,
        //   height: 16
        //   // behaviorLoop: [
        //   //   {type: "walk", direction: "left"},
        //   //   // {type: "stand", direction: "up", time: 800},
        //   //   {type: "walk", direction: "left"},
        //   //   {type: "walk", direction: "left"},
        //   //   {type: "walk", direction: "up"},
        //   //   // {type: "walk", direction: "down"}
        //   // ]
        // })
    },
    // walls that player can collide with
    walls: {
    // to be mounted automatically with the collision array iteration for each map
    // [utils.asGridCoord(42, 26)]: true,
    },
    cutsceneSpaces: {
        // [utils.inlinePoints(15, 11, 16, 11)]: [
        //   {
        //     events: [
        //       {who: "npcA", type: "walk", direction: "left"},
        //       {who: "npcA", type: "walk", direction: "left"},
        //       {who: "npcA", type: "walk", direction: "left"},
        //       {who: "npcA", type: "walk", direction: "up"},
        //       {type: "textMessage", text: "Hey, you!"},
        //       {type: "textMessage", text: "Can't go upper there, go back now!"},
        //       {who: "npcA", type: "walk", direction: "right"},
        //       {who: "npcA", type: "stand", direction: "down", time: 500},
        //       {who: "hero", type: "stand", direction: "down", time: 10},
        //       {who: "hero", type: "walk", direction: "down"},
        //       {who: "hero", type: "walk", direction: "down"},
        //       {who: "npcA", type: "walk", direction: "down"},
        //       {who: "npcA", type: "walk", direction: "right"},
        //       {who: "npcA", type: "walk", direction: "right"}
        //     ]
        //   }
        // ],
        [utils.inlinePoints(4, 16)]: [
            {
                events: [{ type: "changeMap", map: "Kitchen" }]
            }
        ]
    },
    collisionData: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
};
