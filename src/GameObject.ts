interface GameObjectConfig {
  x: number
  y: number
  src: string
  currentAnimation: string
  direction?: string
  tileSize: number
  useShadow: boolean
  width: number
  height: number
}

class GameObject {
  x: number
  y: number
  sprite: Sprite
  direction: string
  isMounted: boolean
  width: number
  height: number

  constructor(config: GameObjectConfig) {
    this.isMounted = false
    this.x = config.x || 0
    this.y = config.y || 0
    this.direction = config.direction || "down"
    this.width = config.width
    this.height = config.height
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src,
      currentAnimation: config.currentAnimation,
      tileSize: config.tileSize,
      useShadow: config.useShadow
    })
  }

  // mount wall
  mount(map: OverWorldMap) {
    this.isMounted = true
    map.addWall(this.x, this.y)
  }

  update(state: {arrow: string; map: OverWorldMap}) {}
}
