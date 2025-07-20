interface OverWorldEventConfig {
  map: OverWorldMap
  event: {
    type: string
    direction: string
    time?: number
    who: string
  }
}

class OverWorldEvent {
  map: OverWorldMap
  event: {
    type: string
    direction: string
    time?: number
    who: string
  }

  constructor(config: OverWorldEventConfig) {
    this.map = config.map
    this.event = config.event
  }

  stand(resolve: () => void) {
    // Implement stand logic here
    resolve()
  }

  walk(resolve: () => void) {
    const who = this.map.gameObjects[this.event.who]
    who.startBehavior(
      {
        map: this.map,
        arrow: this.event.direction
      },
      {
        type: "walk",
        direction: this.event.direction
      },
      16
    )

    const completeHandler = (e: Event) => {
      const customEvent = e as CustomEvent<{whoId: string}>
      if (customEvent.detail.whoId === this.event.who) {
        document.removeEventListener("PersonWalkingComplete", completeHandler)
        resolve()
      }
    }

    document.addEventListener("PersonWalkingComplete", completeHandler)
  }

  init() {
    return new Promise<void>((resolve) => {
      // @ts-ignore
      this[this.event.type](resolve)
    })
  }
}
