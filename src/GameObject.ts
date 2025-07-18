const {Bodies} = Matter

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
  world: Matter.World
  type: string
}

class GameObject {
  x: number
  y: number
  sprite: Sprite
  direction: string
  isMounted: boolean
  width: number
  height: number
  world: Matter.World
  type: string
  body: null | Matter.Body
  tileSize: number

  constructor(config: GameObjectConfig) {
    this.isMounted = false
    this.x = config.x || 0
    this.y = config.y || 0
    this.direction = config.direction || "down"
    this.width = config.width
    this.height = config.height
    this.world = config.world
    this.type = config.type
    this.body = null
    this.tileSize = config.tileSize

    this.sprite = new Sprite({
      gameObject: this,
      src: config.src,
      currentAnimation: config.currentAnimation,
      tileSize: config.tileSize,
      useShadow: config.useShadow
    })
  }

  createPhysicalBody(cameraman: {[key: string]: number}) {
    // create the physical body around the players and npcs
    this.body = Bodies.rectangle(
      this.x + utils.withGrid(10.5) - cameraman.x,
      this.y + 3 + utils.withGrid(6) - cameraman.y,
      this.width,
      this.height,
      {
        restitution: 0.1,
        friction: 0.05,
        label: this.type
      }
    )
    World.add(this.world, this.body)
  }

  // mount wall
  mount(map: OverWorldMap) {
    this.isMounted = true
    map.addWall(this.x, this.y)
  }

  update(state: {arrow: string; map: OverWorldMap}) {}
}
