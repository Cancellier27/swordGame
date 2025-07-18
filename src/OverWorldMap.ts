const {Events} = Matter

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
  isColliding: boolean

  constructor(config: OverWorldMapConfig) {
    // references the gameObjects to be used here
    this.gameObjects = config.gameObjects

    this.walls = config.walls || {}

    this.isColliding = false

    // load the lower image of the map
    this.lowerImage = new Image()
    this.lowerImage.src = config.lowerSrc

    // lower the upper image of the map
    this.upperImage = new Image()
    this.upperImage.src = config.upperSrc

    this.mountMapWalls()
  }

  drawLowerImage(ctx: CanvasRenderingContext2D, cameraPerson: GameObject) {
    ctx.drawImage(this.lowerImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y)
  }

  drawUpperImage(ctx: CanvasRenderingContext2D, cameraPerson: GameObject) {
    ctx.drawImage(this.upperImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y)
  }

  drawBodies(
    ctx: CanvasRenderingContext2D,
    cameraPerson: GameObject,
    body: Matter.Body,
    width: number,
    height: number
  ) {
    const pos = body.position
    const angle = body.angle

    ctx.save()
    ctx.translate(pos.x, pos.y)
    ctx.rotate(angle)
    ctx.strokeStyle = "blue"
    ctx.lineWidth = 1
    ctx.strokeRect(-width / 2, -height / 2, width, height)
    ctx.restore()
  }

  // mountObjects() {
  //   Object.values(this.gameObjects).forEach((object) => {
  //     // TODO, determine if this element should really mount
  //     object.mount(this)
  //   })
  // }

  mountMapWalls() {
    utils.createMapWalls([[42, 26]], this.walls)
    // utils.createMapWalls([[42,26],[43,23],[44,23],[35,23],[36,23],[37,23]], this.walls)
  }

  isSpaceTaken(currentX: number, currentY: number, direction: string) {
    const {x, y} = utils.nextPosition(currentX, currentY, direction)
    return this.walls[`${x},${y}`] || false
  }

  // walls functions, add, remove and move
  addWall(x: number, y: number) {
    this.walls[`${x},${y}`] = true
  }

  removeWall(x: number, y: number) {
    delete this.walls[`${x},${y}`]
  }

  moveWall(wasX: number, wasY: number, direction: string) {
    this.removeWall(wasX, wasY)
    const {x, y} = utils.nextPosition(wasX, wasY, direction)
    this.addWall(x, y)
  }
}
