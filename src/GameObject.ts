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
  behaviorLoop?: any[]
}
class GameObject {
  x: number
  y: number
  sprite: Sprite
  direction: string
  isMounted: boolean
  width: number
  height: number
  id: null | string
  currentAnimation: string
  behaviorLoop: any[]
  behaviorLoopIndex: number

  constructor(config: GameObjectConfig) {
    this.id = null
    this.isMounted = false
    this.x = config.x || 0
    this.y = config.y || 0
    this.direction = config.direction || "down"
    this.width = config.width
    this.height = config.height
    this.currentAnimation = config.currentAnimation
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src,
      currentAnimation: this.currentAnimation,
      tileSize: config.tileSize,
      useShadow: config.useShadow
    })
    // fix behavior type
    this.behaviorLoop = config.behaviorLoop || []
    this.behaviorLoopIndex = 0
  }

  // mount wall
  mount(map: OverWorldMap) {
    this.isMounted = true
    map.addWall(this.x / 16, this.y / 16)

    // if we have a behavior, kick off after a short delay

  }

  update(state: {arrow: string; map: OverWorldMap}) {}

  doBehaviorEvent(map: OverWorldMap) {
    // check what behavior we are on
    let event = this.behaviorLoop[this.behaviorLoopIndex]
    eventConfig.who = this.id

    const eventHandlet = new OverWorldEvent({map, event: eventConfig})
  }
}
