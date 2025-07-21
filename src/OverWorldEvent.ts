interface OverWorldEventConfig {
  map: OverWorldMap
  event: {
    type: string
    direction: string
    time?: number
    who: string
    retry?: boolean
  }
}

class OverWorldEvent {
  map: OverWorldMap
  event: {
    type: string
    direction: string
    time?: number
    who?: string
    retry?: boolean
    text?: string
  }

  constructor(config: OverWorldEventConfig) {
    this.map = config.map
    this.event = config.event
  }

  stand(resolve: () => void) {
    if (this.event.who) {
      const who = this.map.gameObjects[this.event.who]
      who.startBehavior(
        {
          map: this.map,
          arrow: this.event.direction
        },
        {
          type: "stand",
          direction: this.event.direction,
          time: this.event.time,
          who: this.event.who
        }
      )
    }

    const completeHandler = (e: Event) => {
      const customEvent = e as CustomEvent<{whoId: string}>
      if (customEvent.detail.whoId === this.event.who) {
        document.removeEventListener("PersonStandComplete", completeHandler)
        resolve()
      }
    }

    document.addEventListener("PersonStandComplete", completeHandler)
  }

  walk(resolve: () => void) {
    if (this.event.who) {
      const who = this.map.gameObjects[this.event.who]
      who.startBehavior(
        {
          map: this.map,
          arrow: this.event.direction
        },
        {
          type: "walk",
          direction: this.event.direction,
          who: this.event.who,
          retry: true
        }
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
  }

  textMessage(resolve: () => void) {
    if(this.event.text) {
      const message = new TextMessage({
        text: this.event.text,
        onComplete: () => resolve()
      })
      message.init(document.querySelector(".game-container") as HTMLDivElement)
    }
  }

  init() {
    return new Promise<void>((resolve) => {
      // @ts-ignore
      this[this.event.type](resolve)
    })
  }
}
