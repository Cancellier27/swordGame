const {Engine, World} = Matter

class PhysicsEngine {
  engine: Matter.Engine
  world: Matter.World

  constructor() {
    this.engine = Engine.create()
    this.world = this.engine.world
    // You can set gravity here if needed
    this.world.gravity.y = 0
  }

  update(deltaTime: number) {
    Engine.update(this.engine, deltaTime)
  }

  listenForCollisions(map: OverWorldMap) {
    Events.on(this.engine, "collisionStart", function (event) {
      map.isColliding = true
    })
    Events.on(this.engine, "collisionEnd", function (event) {
      map.isColliding = false
    })
  }

  init() {
    Matter.Runner.run(Matter.Runner.create(), this.engine)
  }
}
