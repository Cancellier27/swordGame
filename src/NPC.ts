interface NPCConfig extends GameObjectConfig {
  isPlayerControlled: boolean
}

class NPC extends GameObject {
  movingProgressRemaining: number
  directionUpdate: {[key: string]: [string, number][]}
  isPlayerControlled: boolean
  direction: string

  constructor(config: ProtagonistConfig) {
    super(config)
    this.movingProgressRemaining = 0

    this.direction = config.currentAnimation

    this.isPlayerControlled = config.isPlayerControlled

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

  update(state: {arrow: string; map: OverWorldMap}) {
    if (this.movingProgressRemaining > 0) {
      this.updatePosition()
    } else {
      // more cases to start to walk wil come here

      this.updateSprite()
    }
  }

  startBehavior(state: {arrow: string; map: OverWorldMap}, behavior: {[keu: string]: string}, movingProgress: number) {
    // set the character to walk or do some behavior
    this.direction = behavior.direction

    if (behavior.type === "walk") {
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        // if space is taken ahead, return and do not move
        return
      }

      // mount wall
      state.map.moveWall(this.x, this.y, this.direction)
      // keep walking!
      this.movingProgressRemaining = 4
      this.updateSprite()
    }
  }

  // update player position and movingProgressRemaining
  updatePosition(): void {
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

    if (this.movingProgressRemaining === 0) {
      // finished walking here
      utils.emitEvent("PersonWalkingComplete", {
        whoId: this.id
      })
    }
  }

  updateSprite() {
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction)
      return
    }

    this.sprite.setAnimation("idle-" + this.direction)
  }
}
