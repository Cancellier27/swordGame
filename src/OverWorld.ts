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

  startGameLoop(fps: number) {
    let previousMs: undefined | number = undefined

    // loop at X fps, 60 in this game
    const step = 1 / fps
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
        this.loop()
        delta -= step
      }
      previousMs = timestampMs - delta * 1000

      // recalls the loop tick func
      requestAnimationFrame(tick)
    }

    // initial kick off!
    requestAnimationFrame(tick)
  }

  loop() {
    // what to update during the loop to be put here

    // clear the canvas every time the loop runs, before drawing onto screen.
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // Establish the camera person
    const cameraPerson = this.map.gameObjects.hero

    // update all objects (for a big game this part here will generate performance issues)
    Object.values(this.map.gameObjects).forEach((object) => {
      object.update({
        arrow: this.directionInput.direction,
        map: this.map
      })
    })

    // Draw LOWER tiles layer
    this.map.drawLowerImage(this.ctx, cameraPerson)

    // players and NPCs
    Object.values(this.map.gameObjects).forEach((object) => {
      object.sprite.draw(this.ctx, cameraPerson)
    })
    // Draw UPPER tiles layer
    this.map.drawUpperImage(this.ctx, cameraPerson)

    // draw collision walls for debbuging
    this.map.drawCollisionPoints(this.ctx, cameraPerson)
  }

  init() {
    this.map = new OverWorldMap({
      lowerSrc: "../images/maps/TestMap_lower.png",
      upperSrc: "../images/maps/TestMap_upper.png",
      gameObjects: {
        hero: new Protagonist({
          x: utils.withGrid(3),
          y: utils.withGrid(8),
          isPlayerControlled: true,
          currentAnimation: "idle-down",
          src: "../images/characters/people/player.png",
          tileSize: 48,
          useShadow: true,
          width: 16,
          height: 16
        }),
        slime: new NPC({
          x: utils.withGrid(10),
          y: utils.withGrid(14),
          isPlayerControlled: true,
          currentAnimation: "walk-up",
          src: "../images/characters/people/slime.png",
          tileSize: 32,
          useShadow: false,
          width: 20,
          height: 12
        })
      },
      // walls that player can collide with
      walls: {
        // [utils.asGridCoord(42, 26)]: true,
        // [utils.asGridCoord(43, 23)]: true,
        // [utils.asGridCoord(44, 23)]: true,
        // [utils.asGridCoord(35, 23)]: true,
        // [utils.asGridCoord(36, 23)]: true,
        // [utils.asGridCoord(37, 23)]: true
      }
    })
    // this.map.mountObjects()

    // create and initializes the class DirectionInput to listen to keyboard press
    this.directionInput = new DirectionInputs()
    this.directionInput.init()

    // start game loop
    this.startGameLoop(60)
  }
}
