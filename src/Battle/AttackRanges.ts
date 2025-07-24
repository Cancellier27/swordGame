const attackRanges = {
  entityHitPoints(x: number, y: number) {
    const points: {[key: string]: boolean} = {}

    for (let i = 1; i < 5; i++) {
      for (let j = 1; j < 5; j++) {
        points[`${x * i},${y * j}`] = true
      }
    }

    return points
  },
  swordNormal(x: number, y: number, direction: string) {
    // const points: {[key: string]: boolean} = {}
    // if (direction === "right") {
    //   ;(points[`${x + 16},${y - 4}`] = true),
    //     (points[`${x + 20},${y}`] = true),
    //     (points[`${x + 24},${y + 4}`] = true),
    //     (points[`${x + 24},${y + 8}`] = true),
    //     (points[`${x + 24},${y + 12}`] = true),
    //     (points[`${x + 20},${y + 16}`] = true),
    //     (points[`${x + 16},${y + 20}`] = true)
    // }
    // x+16 to x+24
    // y-8 to y+24

    const points: {[key: string]: number} = {}

    if (direction === "right") {
      ;(points["startX"] = x + 16), (points["endX"] = x + 24), (points["startY"] = y - 8)
      points["endY"] = y + 24
    }

    return points
  }
}
