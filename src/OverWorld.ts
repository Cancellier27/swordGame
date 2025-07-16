interface OverWorldConfig {
  element: HTMLElement
}

class OverWorld {
  element: HTMLElement
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  map!: OverWorldMap
  directionInput!: DirectionInputs

  constructor(config: OverWorldConfig) {
    this.element = config.element
    const canvas = this.element.querySelector(".game-canvas")

    if (!canvas) {
      throw new Error('Canvas element with class "game-canvas" not found.')
    }
    this.canvas = canvas as HTMLCanvasElement

    const ctx = this.canvas.getContext("2d")
    if (!ctx) {
      throw new Error("2D rendering context not supported or canvas already initialized.")
    }
    this.ctx = ctx

    // this.map = "toBeAssigned"
  }

  startGameLoop() {
    let previousMs: undefined | number = undefined

    // loop at 60 fps
    const step = 1 / 60
    const tick = (timestampMs: number) => {
      // for later on in the code
      // if (this.hasStopped) {
      //   return
      // }

      if (previousMs === undefined) {
        previousMs = timestampMs
      }

      let delta = (timestampMs - previousMs) / 1000
      while (delta >= step) {
        // what to update during the loop to be put here

        // clear the canvas every time the loop runs, before drawing onto screen.
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        // Draw LOWER tiles layer
        this.map.drawLowerImage(this.ctx)

        // players and NPCs
        Object.values(this.map.gameObjects).forEach((object) => {
          object.update({
            arrow: this.directionInput.direction
          })
          object.sprite.draw(this.ctx)
        })
        // Draw UPPER tiles layer
        this.map.drawUpperImage(this.ctx)

        delta -= step
      }
      previousMs = timestampMs - delta * 1000

      // recalls the loop tick func
      requestAnimationFrame(tick)
    }

    // initial kick off!
    requestAnimationFrame(tick)
  }

  init() {
    this.map = new OverWorldMap({
      lowerSrc: "../images/maps/BosqueLower.png",
      upperSrc: "../images/maps/BosqueUpper.png",
      gameObjects: {
        hero: new Protagonist({
          x: utils.withGrid(3),
          y: utils.withGrid(6),
          isPlayerControlled: true
        })
      }
    })

    // create and initializes the class DirectionInput to listen to keyboard press
    this.directionInput = new DirectionInputs()
    this.directionInput.init()

    // start game loop
    this.startGameLoop()
  }
}
