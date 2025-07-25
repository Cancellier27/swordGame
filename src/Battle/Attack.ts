interface AttackConfig {
  map: OverWorldMap
}

class Attack {
  player: GameObject
  gameObjects: {[key: string]: GameObject}
  isAttacking: null | KeyPressListener
  map: OverWorldMap

  constructor(config: AttackConfig) {
    this.player = config.map.gameObjects.hero
    this.gameObjects = config.map.gameObjects
    this.map = config.map
    this.isAttacking = null
  }

  wasSomeoneHit() {
    const x = this.player.x
    const y = this.player.y
    const direction = this.player.direction
    const entitiesHitPoints = attackRanges.swordSwing(x, y, direction)

    // check if there is any objects nearby player first
    const entitiesNearby = Object.values(this.gameObjects).filter((object) => {
      if (!object.isAttacking) {
        if (x - 24 <= object.x && x + 32 >= object.x && y - 24 <= object.y && y + 32 >= object.y) {
          return object
        }
      }
    })

    // check if no one is close and return the func
    if (entitiesNearby.length === 0) return

    // check if a enemy was hit
    const entitiesHit = entitiesNearby.filter((object) => {
      if (!object.isAttacking) {
        if (
          entitiesHitPoints.startX <= object.x &&
          entitiesHitPoints.endX >= object.x &&
          entitiesHitPoints.startY <= object.y &&
          entitiesHitPoints.endY >= object.y
        ) {
          return object
        }
      }
    })

    // check if no one is hit and return the func
    if (entitiesHit.length === 0) return

    // if hit, start the behavior to push the opponent in the opposite direction adn decrease health
    entitiesHit.forEach((object) => {
      object.startBehavior(
        {
          arrow: direction,
          map: this.map
        },
        {
          type: "push",
          direction: direction
        }
      )

      this.updateStateWhenAttacked("swordSwing", object)
    })
  }

  updateStateWhenAttacked(attackType: keyof typeof PlayerState.attacks, object: GameObject) {
    const attackStrength = this.player.state.attacks[attackType]
    const enemyHp = object.state.hp

    if (enemyHp > 0) {
      object.state.hp = enemyHp - attackStrength
    }
    
    if(enemyHp - attackStrength <= 0) {
      setTimeout(() => {
        this.map.removeWall(object.x / 16, object.y / 16)
      }, 100)
    }

    console.log(object.state.hp)
  }

  init() {
    this.isAttacking = new KeyPressListener("Space", () => {
      this.player.isAttacking = true

      this.wasSomeoneHit()
    })
  }
}
