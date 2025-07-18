"use strict";
// interface CollisionBodiesConfig {
//   map: OverWorldMap
//   world: Matter.World
// }
// class CollisionBodies {
//   gameObjects: {[key: string]: GameObject}
//   cameraman: GameObject
//   world: Matter.World
//   constructor(config: CollisionBodiesConfig) {
//     this.gameObjects = config.map.gameObjects
//     this.cameraman = config.map.gameObjects.hero
//     this.world = config.world
//   }
//   createCharacterBodies() {
//     Object.values(this.gameObjects).forEach((object) => {
//       const body = Bodies.rectangle(
//         object.x + utils.withGrid(10.5) - this.cameraman.x,
//         object.y + 3 + utils.withGrid(6) - this.cameraman.y,
//         object.width,
//         object.height,
//         {
//           restitution: 0.1,
//           friction: 0.05,
//           chamfer: {
//             radius: [5, 5, 0, 0]
//           }
//         }
//       )
//       World.add(this.world, body)
//     })
//   }
//   init() {
//     this.createCharacterBodies()
//   }
// }
