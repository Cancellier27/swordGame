interface EnemyAiConfig {
  hero: GameObject
}

class EnemyAi {
  hero: GameObject

  constructor(gameObjects: {[key: string]: GameObject}) {
    this.hero = gameObjects.hero
  }
}
