interface GameObjectConfig {
  x: number
  y: number
  src: string
  currentAnimation: string
  direction?: string
  tileSize: number,
  useShadow: boolean
}

class GameObject {
  x: number
  y: number
  sprite: Sprite
  direction: string

  constructor(config: GameObjectConfig) {
    this.x = config.x || 0
    this.y = config.y || 0
    this.direction = config.direction || "down"
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src,
      currentAnimation: config.currentAnimation,
      tileSize: config.tileSize,
      useShadow: config.useShadow
    })
  }

  update(state: {"arrow": string, "map": OverWorldMap}) {}
}
