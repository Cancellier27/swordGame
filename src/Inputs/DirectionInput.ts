interface DirectionInputsConfig {}

class DirectionInputs {
  heldDirections: string[]
  directionMap: {[key: string]: string}
  validDiagonalMovements: string[]
  keyDownFunction: (e: KeyboardEvent) => void
  keyUpFunction: (e: KeyboardEvent) => void

  constructor() {
    this.heldDirections = []
    // arrow sent for direction the character needs to move
    this.directionMap = {
      ArrowUp: "up",
      KeyW: "up",
      ArrowDown: "down",
      KeyS: "down",
      ArrowRight: "right",
      KeyD: "right",
      ArrowLeft: "left",
      KeyA: "left"
    }
    this.validDiagonalMovements = [
      "up-right",
      "right-up",
      "down-right",
      "right-down",
      "up-left",
      "left-up",
      "down-left",
      "left-down"
    ]

    this.keyDownFunction = (e: KeyboardEvent) => {
      const dir: string = this.directionMap[e.code]
      const index = this.heldDirections.indexOf(dir)

      if (dir && index === -1) {
        this.heldDirections.unshift(dir)
      }
    }

    this.keyUpFunction = (e: KeyboardEvent) => {
      const dir: string = this.directionMap[e.code]
      const index = this.heldDirections.indexOf(dir)

      if (dir && index > -1) {
        this.heldDirections.splice(index, 1)
      }
    }
  }

  // acts like a value from the class but it is dynamic and always will have the 0 value from the heldDirections array
  get direction(): string {
    if (this.heldDirections.length > 1) {
      let dir = this.heldDirections.slice(0, 2).join("-")
      if (this.validDiagonalMovements.includes(dir)) {
        // moving diagonally
        return dir
      } else {
        return this.heldDirections[0]
      }
    } else {
      return this.heldDirections[0]
    }
  }

  unbind() {
    this.heldDirections = []
    // Remove events
    document.removeEventListener("keydown", this.keyDownFunction)
    document.removeEventListener("keyup", this.keyUpFunction)
  }

  init() {
    // event listener for when a key is pressed to ADD that arrow value into the helDirections array
    document.addEventListener("keydown", this.keyDownFunction)
    // event listener for when a key is pressed to REMOVE that arrow value into the helDirections array
    document.addEventListener("keyup", this.keyUpFunction)
  }
}
