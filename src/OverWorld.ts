interface OverWorldConfig {
  element: HTMLElement
}

class OverWorld {
  element: HTMLElement
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

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
  }

  init() {
    const image = new Image()
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0)
    }
    image.src = "../images/maps/BosqueLower.png"

    // Place GameObjects
    const hero = new GameObject({
      x: 3,
      y: 6
    })

    setTimeout(() => {
      hero.sprite.draw(this.ctx)
    }, 200)
  }
}
