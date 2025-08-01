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
    faceHero?: string
    map?: string
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

  attack(resolve: () => void) {
    // fire async event to wait for attack to finish

    const completeHandler = (e: Event) => {
      const customEvent = e as CustomEvent<{whoId: string}>
      if (customEvent.detail.whoId === this.event.who) {
        document.removeEventListener("PersonAttackingComplete", completeHandler)
        resolve()
      }
    }

    document.addEventListener("PersonAttackingComplete", completeHandler)
    // }
  }

  textMessage(resolve: () => void) {
    if (this.event.faceHero) {
      const obj = this.map.gameObjects[this.event.faceHero]
      obj.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction)
    }

    if (this.event.text) {
      const message = new TextMessage({
        text: this.event.text,
        onComplete: () => resolve()
      })
      message.init(document.querySelector(".game-container") as HTMLDivElement)
    }
  }

  changeMap(resolve: () => void) {
    if (!this.event.map) return

    // Reset all entities before map change
    Object.values(this.map.gameObjects).forEach((object) => {
      object.isActive = false
    })

    const sceneTransitionFog = new SceneTransition()

    sceneTransitionFog.init(document.querySelector(".game-container") as HTMLDivElement, () => {
      this.map.overWorld?.startMap(this.event.map)
      resolve()

      sceneTransitionFog.fadeOut()
    })
  }

  pause(resolve: () => void) {
    this.map.isPaused = true

    Object.values(this.map.gameObjects).forEach((object) => {
      object.isActive = false
    })

    const newPauseInstance = new PauseMenu({
      onComplete: () => {
        resolve()
        this.map.isPaused = false
        this.map.overWorld?.directionInput.init()
        this.map.overWorld?.startGameLoop(60)

        setTimeout(() => {
          Object.values(this.map.gameObjects).forEach((object) => {
            object.isActive = true
            object.doBehaviorEvent(this.map)
          })
        }, 1000)
      }
    })

    newPauseInstance.init()
  }

  init() {
    return new Promise<void>((resolve) => {
      // @ts-ignore
      this[this.event.type](resolve)
    })
  }
}
