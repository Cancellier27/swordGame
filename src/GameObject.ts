interface GameObjectConfig {
  x: number
  y: number
  src?: string
  direction?: string
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
      src: config.src || "../images/characters/people/player.png"
    })
  }

  update(state: {[key: string]: string}) {

  }
}
