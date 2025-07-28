interface DirectionInputsConfig {}

class DirectionInputs {
  heldDirections: string[]
  directionMap: {[key: string]: string}
  validDiagonalMovements: string[]

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

  init() {
    // event listener for when a key is pressed to ADD that arrow value into the helDirections array
    document.addEventListener("keydown", (e) => {
      const dir: string = this.directionMap[e.code]
      const index = this.heldDirections.indexOf(dir)

      if (dir && index === -1) {
        this.heldDirections.unshift(dir)
      }
    })
    // event listener for when a key is pressed to REMOVE that arrow value into the helDirections array
    document.addEventListener("keyup", (e) => {
      const dir: string = this.directionMap[e.code]
      const index = this.heldDirections.indexOf(dir)

      if (dir && index > -1) {
        this.heldDirections.splice(index, 1)
      }
    })
  }
}
