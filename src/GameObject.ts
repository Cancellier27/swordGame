interface GameObjectConfig {
  x: number
  y: number
  src: string
  currentAnimation: string
  direction: string
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
  behaviorLoop: any[]
  behaviorLoopIndex: number
  isStanding: boolean

  constructor(config: GameObjectConfig) {
    this.isStanding = false
    this.id = null
    this.isMounted = false
    this.x = config.x || 0
    this.y = config.y || 0
    this.direction = config.direction
    this.width = config.width
    this.height = config.height
    this.direction = config.direction
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src,
      currentAnimation: config.currentAnimation,
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
    setTimeout(() => {
      this.doBehaviorEvent(map)
    }, 10)
  }

  update(state: {arrow: string; map: OverWorldMap}) {}
  startBehavior(
    state: {arrow: string; map: OverWorldMap},
    behavior: {
      type: string
      direction: string
      time?: number
      who?: string
      retry?: boolean
    }
  ) {}

  //  do not do anything is there is no behavior loop
  async doBehaviorEvent(map: OverWorldMap) {
    if (map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding) {
      return
    }

    // check what behavior we are on
    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex]
    eventConfig.who = this.id

    // create an event instance of our event config
    if (eventConfig.type === "walk") {
      // create for instances of walking to compensate the 16x16 grid used, as the character only walks 4 pixel per frame.
      for (let i = 0; i < 4; i++) {
        const eventHandler = new OverWorldEvent({map, event: eventConfig})
        await eventHandler.init()
      }
    } else {
      const eventHandler = new OverWorldEvent({map, event: eventConfig})
      await eventHandler.init()
    }

    // go to the next loop
    this.behaviorLoopIndex += 1
    // reset the behavior loop
    if (this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0
    }

    // do it again!
    this.doBehaviorEvent(map)
  }
}
