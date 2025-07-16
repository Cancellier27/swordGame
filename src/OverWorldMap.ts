interface OverWorldMapConfig {
  gameObjects: {[key: string]: GameObject}
  lowerSrc: string
  upperSrc: string
  walls: {[key: string]: boolean}
}

class OverWorldMap {
  lowerImage: HTMLImageElement
  upperImage: HTMLImageElement
  gameObjects: {[key: string]: GameObject}
  walls: {[key: string]: boolean}

  constructor(config: OverWorldMapConfig) {
    // references the gameObjects to be used here
    this.gameObjects = config.gameObjects

    this.walls = config.walls || {}

    // load the lower image of the map
    this.lowerImage = new Image()
    this.lowerImage.src = config.lowerSrc

    // lower the upper image of the map
    this.upperImage = new Image()
    this.upperImage.src = config.upperSrc

    // this.mountMapWalls()
  }

  drawLowerImage(ctx: CanvasRenderingContext2D, cameraPerson: GameObject) {
    ctx.drawImage(this.lowerImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y)
  }

  drawUpperImage(ctx: CanvasRenderingContext2D, cameraPerson: GameObject) {
    ctx.drawImage(this.upperImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y)
  }


  // mountObjects() {   
  //   Object.values(this.gameObjects).forEach((object) => {
  //     // TODO, determine if this element should really mount
  //     object.mount(this)
  //   })
  // }

  // mountMapWalls() {
  //   utils.createMapWalls([[42,26],[43,23],[44,23],[35,23],[36,23],[37,23]], this.walls)
  // }

  // walls functions, add, remove and move
  addWall(x: number, y: number) {
    this.walls[`${x},${y}`] = true
  }

  removeWall(x: number, y: number) {
    delete this.walls[`${x},${y}`]
  }

  // moveWall(wasX: number, wasY: number, direction: string) {
  //   this.removeWall(wasX, wasY)

  //   this.addWall(x, y)
  // }
}
