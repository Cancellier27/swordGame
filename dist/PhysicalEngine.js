const {Engine, World} = Matter
class PhysicsEngine {
  constructor() {
    this.engine = Engine.create()
    this.world = this.engine.world
    // You can set gravity here if needed
    this.world.gravity.y = 0
  }
  update(deltaTime) {
    Engine.update(this.engine, deltaTime)
  }
}
