const utils = {
  withGrid(n: number) {
    return n * 16
  },
  asGridCoord(x: number, y: number) {
    return `${x * 16},${y * 16}`
  },
  
  // createMapWalls(wallsArr: number[][], walls: {[key: string]: boolean}) {
  //   wallsArr.forEach((wall: number[]) => {
  //     let x = wall[0]
  //     let y = wall[1]

  //     // ref point wall
  //     walls[`${x},${y}`] = true // 4x4 <-

  //     // bottom wall
  //     walls[this.asGridCoord(x - 1, y)] = true // 3x4
  //     walls[this.asGridCoord(x - 2, y)] = true // 2x4
  //     walls[this.asGridCoord(x - 3, y)] = true // 1x4
  //     walls[this.asGridCoord(x - 4, y)] = true // 0x4 <-
  //     // left wall
  //     walls[this.asGridCoord(x - 4, y - 1)] = true // 0x3
  //     walls[this.asGridCoord(x - 4, y - 2)] = true // 0x2
  //     walls[this.asGridCoord(x - 4, y - 3)] = true // 0x1
  //     walls[this.asGridCoord(x - 4, y - 4)] = true // 0x0 <-
  //     // top wall
  //     walls[this.asGridCoord(x - 3, y - 4)] = true // 1x0
  //     walls[this.asGridCoord(x - 2, y - 4)] = true // 2x0
  //     walls[this.asGridCoord(x - 1, y - 4)] = true // 3x0
  //     // right wall
  //     walls[this.asGridCoord(x, y - 4)] = true // 4x0 <-
  //     walls[this.asGridCoord(x, y - 3)] = true // 4x1
  //     walls[this.asGridCoord(x, y - 2)] = true // 4x2
  //     walls[this.asGridCoord(x, y - 1)] = true // 4x3
  //   })
  // }
}
