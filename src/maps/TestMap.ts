const TestMap = {
  lowerSrc: "../images/maps/TestMap_lower.png",
  upperSrc: "../images/maps/TestMap_upper.png",
  gameObjects: {
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
        {type: "stand", direction: "up", time: 800},
        {type: "stand", direction: "right", time: 2000},
        {type: "stand", direction: "left", time: 1200},
        {type: "stand", direction: "down", time: 800},
        
      ]
    }),
    npcA: new Person({
      x: utils.withGrid(16),
      y: utils.withGrid(13),
      isPlayerControlled: false,
      currentAnimation: "idle-down",
      direction: "down",
      src: "../images/characters/people/player.png",
      tileSize: 48,
      useShadow: false,
      width: 16,
      height: 16,
      behaviorLoop: [
        {type: "walk", direction: "left"},
        {type: "stand", direction: "up", time: 800},
        {type: "walk", direction: "up"},
        {type: "walk", direction: "right"},
        {type: "walk", direction: "down"}
      ]
    }),
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
    })
  },
  // walls that player can collide with
  walls: {
    // to be mounted automatically with the collision array iteration for each map
    // [utils.asGridCoord(42, 26)]: true,
  }
}
