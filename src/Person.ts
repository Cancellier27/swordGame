interface PersonConfig extends GameObjectConfig {
  isPlayerControlled: boolean
}

class Person extends GameObject {
  movingProgressRemaining: number
  directionUpdate: {[key: string]: [string, number][]}
  isPlayerControlled: boolean

  constructor(config: PersonConfig) {
    super(config)
    this.movingProgressRemaining = 0
    this.isPlayerControlled = config.isPlayerControlled
    // prettier-ignore
    this.directionUpdate = {
      "up": [["y", -1]],
      "down": [["y", 1]],
      "left": [["x", -1]],
      "right": [["x", 1]],
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
    // if Person is dead, do not do anything
    // if (this.isAlive) return

    if (this.movingProgressRemaining > 0) {
      this.updatePosition()
    } else {
      // more cases to start to walk wil come here

      // arrow comes from the direction input event listener defined in overWorld gameLoop.
      // To player be able to more, the person needs to be a: Player, have an direction arrow, an Id and there should be no cutscene playing
      if (!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow && this.id) {
        if (this.isAttacking) {
          this.startBehavior(state, {
            type: "attack",
            direction: state.arrow,
            who: this.id
          })
        } else {
          this.startBehavior(state, {
            type: "walk",
            direction: state.arrow,
            who: this.id
          })
        }
      }
      this.updateSprite()
    }
  }

  startBehavior(
    state: {arrow: string; map: OverWorldMap},
    behavior: {
      type: string
      direction: string
      time?: number
      who: string
      retry?: boolean
    }
  ) {
    // set the character to walk or do some behavior
    this.direction = behavior.direction
    const validDiagonalMovements = [
      "up-right",
      "right-up",
      "down-right",
      "right-down",
      "up-left",
      "left-up",
      "down-left",
      "left-down"
    ]

    // WALK behavior ------------------------------------------------------------
    if (behavior.type === "walk") {
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        if (validDiagonalMovements.includes(this.direction)) {
          const dir = this.direction.split("-")

          if (!state.map.isSpaceTaken(this.x, this.y, dir[0])) {
            this.direction = dir[0]
          } else if (!state.map.isSpaceTaken(this.x, this.y, dir[1])) {
            this.direction = dir[1]
          } else {
            return
          }
        } else {
          // if you have a retry flag on, please retry the behavior here
          behavior.retry &&
            setTimeout(() => {
              this.startBehavior(state, behavior)
            }, 100)

          // if space is taken ahead, return and do not move
          return
        }
      }
      if (this.isAlive) {
        // set a wall onto the next space here will be
        state.map.moveWall(this.x, this.y, this.direction)
        // keep walking!
        this.movingProgressRemaining = 4
        this.updateSprite()
      }
    }

    // STAND behavior ------------------------------------------------------------
    if (behavior.type === "stand") {
      this.isStanding = true
      setTimeout(() => {
        utils.emitEvent("PersonStandComplete", {
          whoId: this.id
        })
      }, behavior.time)
      this.isStanding = false
    }

    // Push behavior ------------------------------------------------------------
    if (behavior.type === "push") {
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        if (validDiagonalMovements.includes(this.direction)) {
          const dir = this.direction.split("-")

          if (!state.map.isSpaceTaken(this.x, this.y, dir[0])) {
            this.direction = dir[0]
          } else if (!state.map.isSpaceTaken(this.x, this.y, dir[1])) {
            this.direction = dir[1]
          } else {
            return
          }
        }
        return
      }

      // set a wall onto the next space here will be
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

  // get if the object HP is > 0
  get isAlive() {
    return this.state.hp > 0
  }

  updateSprite() {
    // check if the entity is alive, hp > 0
    if (this.state.hp <= 0) return

    if (this.isAttacking) {
      this.sprite.setAnimation("attack-" + utils.getOneDirection(this.direction))
      return
    }

    if (this.movingProgressRemaining > 0 && !this.isAttacking) {
      this.sprite.setAnimation("walk-" + this.direction)
      return
    }

    if (this.direction.includes("-")) {
      let splitDir = this.direction.split("-")[0]
      this.sprite.setAnimation("idle-" + splitDir)
    } else {
      this.sprite.setAnimation("idle-" + this.direction)
    }
  }
}
