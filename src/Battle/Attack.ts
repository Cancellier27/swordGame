interface AttackConfig {
  map: OverWorldMap
}

class Attack {
  player: GameObject
  isAttacking: null | KeyPressListener

  constructor(config: AttackConfig) {
    this.player = config.map.gameObjects.hero
    this.isAttacking = null
  }

  init() {
    this.isAttacking = new KeyPressListener("Space", () => {
      console.log("pressing space")
    })
  }
}
