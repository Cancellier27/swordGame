const utils = {
  withGrid(n: number) {
    return n * 16
  },
  asGridCoord(x: number, y: number) {
    return `${x * 4},${y * 4}`
  },
  nextPosition(initialX: number, initialY: number, direction: string) {
    let x = initialX
    let y = initialY
    const size = 4
    if (direction === "left") {
      x -= size
    } else if (direction === "right") {
      x += size
    } else if (direction === "up") {
      y -= size
    } else if (direction === "down") {
      y += size
    }
    return {x, y}
  },
  createMapWalls(wallsArr: number[][], walls: {[key: string]: boolean}) {
    wallsArr.forEach((wall: number[]) => {
      let x = wall[0] * 16  //tile X
      let y = wall[1] * 16  //tile Y

      // ref point wall
      walls[`${x},${y}`] = true // 4x4 <-

      // bottom wall
      walls[`${x - 4},${y}`] = true // 3x4
      walls[`${x - 8},${y}`] = true // 2x4
      walls[`${x - 12},${y}`] = true // 1x4
      walls[`${x - 16},${y}`] = true // 0x4 <-
      // left wall
      walls[`${x - 16},${y - 4}`] = true // 0x3
      walls[`${x - 16},${y - 8}`] = true // 0x2
      walls[`${x - 16},${y - 12}`] = true // 0x1
      walls[`${x - 16},${y - 16}`] = true // 0x0 <-
      // top wall
      walls[`${x - 12},${y - 16}`] = true // 1x0
      walls[`${x - 8},${y - 16}`] = true // 2x0
      walls[`${x - 4},${y - 16}`] = true // 3x0
      // right wall
      walls[`${x},${y - 16}`] = true // 4x0 <-
      walls[`${x},${y - 13}`] = true // 4x1
      walls[`${x},${y - 8}`] = true // 4x2
      walls[`${x},${y - 4}`] = true // 4x3
    })
  }
}
