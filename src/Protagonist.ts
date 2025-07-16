interface ProtagonistConfig extends GameObjectConfig {
  isPlayerControlled: boolean
}

class Protagonist extends GameObject {
  movingProgressRemaining: number
  directionUpdate: {[key: string]: [string, number]}
  isPlayerControlled: boolean

  constructor(config: ProtagonistConfig) {
    super(config)
    this.movingProgressRemaining = 0

    this.isPlayerControlled = config.isPlayerControlled || false

    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1]
    }
  }

  update(state: {[key: string]: string}) {
    this.updatePosition()
    this.updateSprite(state)

    // arrow comes from the direction input event listener defined in overWorld gameLoop.
    // if not player, it won't move
    if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) {
      this.direction = state.arrow
      this.movingProgressRemaining = 16
    }
  }

  // update player position and movingProgressRemaining
  updatePosition(): void {
    if (this.movingProgressRemaining > 0) {
      // get the this.direction from the extended obj GameObject to get the right directionUpdate value
      const [property, change] = this.directionUpdate[this.direction]

      if (property === "x") {
        ;(this as any).x += change
      } else if (property === "y") {
        ;(this as any).y += change
      }
      this.movingProgressRemaining -= 1
    }
  }

  updateSprite(state: {[key: string]: string}) {
    if (this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow) {
      this.sprite.setAnimation("idle-" + this.direction)
      return
    }

    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction)
    }
  }
}
