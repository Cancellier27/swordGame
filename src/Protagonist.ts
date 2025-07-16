interface ProtagonistConfig extends GameObjectConfig {
  isPlayerControlled: boolean
}

class Protagonist extends GameObject {
  movingProgressRemaining: number
  directionUpdate: {[key: string]: [string, number][]}
  isPlayerControlled: boolean

  constructor(config: ProtagonistConfig) {
    super(config)
    this.movingProgressRemaining = 0

    this.isPlayerControlled = config.isPlayerControlled || false

    // prettier-ignore

    // prettier-ignore
    this.directionUpdate = {
      up: [["y", -1]],
      down: [["y", 1]],
      left: [["x", -1]],
      right: [["x", 1]],
      "up-right": [["x", 1], ["y", -1]],
      "right-up":[["x", 1], ["y", -1]],
      "down-right": [["x", 1], ["y", 1]],
      "right-down":[["x", 1], ["y", 1]],
      "up-left": [["x", -1], ["y", -1]],
      "left-up":[["x", -1], ["y", -1]],
      "down-left": [["x", -1], ["y", 1]],
      "left-down":[["x", -1], ["y", 1]],
    }
  }

  update(state: {[key: string]: string}) {
    this.updatePosition()
    this.updateSprite(state)

    // arrow comes from the direction input event listener defined in overWorld gameLoop.
    // if not player, it won't move
    if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) {
      this.direction = state.arrow
      this.movingProgressRemaining = 4
    }
  }

  // update player position and movingProgressRemaining
  updatePosition(): void {
    if (this.movingProgressRemaining > 0) {
      // get the this.direction from the extended obj GameObject to get the right directionUpdate value
      if (this.directionUpdate[this.direction].length > 1) {
        const [_x, changeX] = this.directionUpdate[this.direction][0]
        const [_y, changeY] = this.directionUpdate[this.direction][1]

        this.x += changeX
        this.y += changeY
      } else {
        const [property, change] = this.directionUpdate[this.direction][0]

        if (property === "x") {
          ;(this as any).x += change
        } else if (property === "y") {
          ;(this as any).y += change
        }
      }

      this.movingProgressRemaining -= 1
    }
  }

  updateSprite(state: {[key: string]: string}) {
    if (this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow) {
      if (this.direction.includes("-")) {
        let splitDir = this.direction.split("-")[0]
        this.sprite.setAnimation("idle-" + splitDir)
        return
      } else { 
        this.sprite.setAnimation("idle-" + this.direction)
        return
      }
    }

    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction)
    }
  }
}
