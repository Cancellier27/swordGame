interface GameObjectConfig {
  x: number
  y: number
  src: string
  currentAnimation: string
  direction: string
  tileSize: number
  useShadow: boolean
  behaviorLoop?: any[]
  talking?: any[]
  vanishDuration?: number
}
class GameObject {
  x: number
  y: number
  sprite: Sprite
  direction: string
  isMounted: boolean
  id: null | string
  behaviorLoop: any[]
  behaviorLoopIndex: number
  isStanding: boolean
  talking: any[]
  isAttacking: boolean
  state!: {[key: string]: any}
  isAlive: boolean = true
  vanishDuration?: number
  vanished: boolean = false
  isActive: boolean = true

  constructor(config: GameObjectConfig) {
    this.isStanding = false
    this.id = null
    this.isMounted = false
    this.x = config.x || 0
    this.y = config.y || 0
    this.direction = config.direction
    this.direction = config.direction
    this.vanishDuration = config.vanishDuration || 500
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src,
      currentAnimation: config.currentAnimation,
      tileSize: config.tileSize,
      useShadow: config.useShadow,
      vanishDuration: config.vanishDuration || 500
    })
    // fix behavior type
    this.behaviorLoop = config.behaviorLoop || []
    this.behaviorLoopIndex = 0
    this.talking = config.talking || []
    this.isAttacking = false
  }

  // mount objects, called only once
  mount(map: OverWorldMap) {
    this.isMounted = true
    map.addWall(this.x / 16, this.y / 16)

    // if we have a behavior, kick off after a short delay
    setTimeout(() => {
      if (this.isActive) {
        this.doBehaviorEvent(map)
      }
    }, 10)
  }

  unmount() {
    this.isActive = false
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
    if (map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding || !this.isActive) {
      console.log(`${this.id}: Return`)
      return
    }

    // check what behavior we are on
    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex]
    eventConfig.who = this.id

    // if (!this.isActive) return
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

    console.log("done")

    // go to the next loop
    this.behaviorLoopIndex += 1
    // reset the behavior loop
    if (this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0
    }

    // do it again!
    if (this.isActive) {
      this.doBehaviorEvent(map)
    }
  }
}
