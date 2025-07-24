interface AttackConfig {
  map: OverWorldMap
}

class Attack {
  player: GameObject
  gameObjects: {[key: string]: GameObject}
  isAttacking: null | KeyPressListener

  constructor(config: AttackConfig) {
    this.player = config.map.gameObjects.hero
    this.gameObjects = config.map.gameObjects
    this.isAttacking = null
  }

  wasSomeoneHit() {
    const x = this.player.x
    const y = this.player.y
    const direction = this.player.direction
    const entitiesHitPoints = attackRanges.swordNormal(x, y, direction)

    Object.values(this.gameObjects).filter((object) => {
      if (!object.isAttacking) {
        if (
          entitiesHitPoints.startX < object.x &&
          entitiesHitPoints.endX > object.x &&
          entitiesHitPoints.startY < object.y &&
          entitiesHitPoints.endY > object.y
        ) {
          console.log("hit")
        }
      }
    })
  }

  init() {
    this.isAttacking = new KeyPressListener("Space", () => {
      this.player.isAttacking = true

      this.wasSomeoneHit()
    })
  }
}
