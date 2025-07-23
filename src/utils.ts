const utils = {
  withGrid(n: number) {
    return n * 16
  },
  asGridCoord(x: number, y: number) {
    return `${x * 4},${y * 4}`
  },
  inlinePoints(initialX: number, initialY: number, endX: number = initialX, endY: number = initialY) {
    if (initialX !== endX) {
      return `${initialX}x${initialY},${endX + 1}x${endY}`
    } else if (initialY !== endY) {
      return `${initialX}x${initialY},${endX}x${endY + 1}`
    } else {
      return `${initialX}x${initialY},${endX}x${endY}`
    }
  },
  getInlinePoints(inlinePoints: string) {
    const firstPointX = Number(inlinePoints.split(",")[0].split("x")[0]) * 16
    const firstPointY = Number(inlinePoints.split(",")[0].split("x")[1]) * 16
    const endPointX = Number(inlinePoints.split(",")[1].split("x")[0]) * 16
    const endPointY = Number(inlinePoints.split(",")[1].split("x")[1]) * 16

    if (firstPointX !== endPointX) {
      return {start: firstPointX, end: endPointX, level: firstPointY, axis: "x"}
    } else if (firstPointY !== endPointY) {
      return {start: firstPointY, end: endPointY, level: firstPointX, axis: "y"}
    } else {
      return {start: firstPointX, end: endPointX + 12, level: firstPointY, axis: "x"}
    }
  },
  nextPosition(initialX: number, initialY: number, direction: string) {
    let topLX = initialX
    let topLY = initialY
    let topRX = initialX + 16
    let topRY = initialY
    let botLX = initialX
    let botLY = initialY + 16
    let botRX = initialX + 16
    let botRY = initialY + 16
    // console.log(`${x},${y}`)
    const size = 4
    // prettier-ignore
    if (direction === "left") {
      topLX -= size
      botLX -= size
      return [[topLX, topLY],[botLX, botLY], [topLX, topLY + 8]]
    } else if (direction === "right") {
      topRX += size
      botRX += size
      return [[topRX, topRY], [botRX, botRY], [topRX, topRY + 8]]
    } else if (direction === "up") {
      topLY -= size
      topRY -= size
      return [[topLX, topLY],[topRX, topRY], [topLX + 8, topLY]]
    } else if (direction === "down") {
      botLY += size
      botRY += size
      return [[botLX, botLY],[botRX, botRY], [botLX + 8, botLY]]
    } else if (direction === "left-up" || direction === "up-left") {
      topLX -= size
      botLX -= size
      topLY -= size
      topRY -= size
      topRX -= size
      botLY -= size
      return [[topLX, topLY],[topRX, topRY], [botLX,botLY], [topLX + 8, topLY], [topLX, topLY + 8]]
    } else if (direction === "left-down" || direction === "down-left") {
      topLX -= size
      topLY += size
      botLX -= size
      botLY += size
      botRX -= size
      botRY += size
      return [[topLX, topLY],[botRX,botRY], [botLX,botLY],[botLX + 8, botLY], [botLX, botLY - 8]]
    } else if (direction === "right-down" || direction === "down-right") {
      topRX += size
      topRY += size
      botLX += size
      botLY += size
      botRX += size
      botRY += size
      return [[topRX, topRY],[botRX,botRY], [botLX,botLY], [botRX -8, botRY],[botRX, botRY - 8]]
    } else if (direction === "right-up" || direction === "up-right") {
      topRX += size
      topRY -= size
      topLX += size
      topLY -= size
      botRX += size
      botRY -= size
      return [[topRX, topRY],[botRX,botRY], [topLX, topLY], [topRX -8, topRY], [topRX, topRY + 8]]
    }
  },
  nextPositionOrigin(initialX: number, initialY: number, direction: string) {
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
    } else if (direction === "left-up" || direction === "up-left") {
      x -= size
      y -= size
    } else if (direction === "left-down" || direction === "down-left") {
      x -= size
      y += size
    } else if (direction === "right-down" || direction === "down-right") {
      x += size
      y += size
    } else if (direction === "right-up" || direction === "up-right") {
      x += size
      y -= size
    }
    return {x, y}
  },
  createMapWalls(wallsArr: number[], walls: {[key: string]: boolean}) {
    // wallsArr.forEach((wall: number[]) => {
    let x = wallsArr[0] * 16 //tile X
    let y = wallsArr[1] * 16 //tile Y

    // left wall
    walls[`${x + 4},${y + 4}`] = true // 4x4 <-
    walls[`${x + 4},${y + 8}`] = true // 4x8
    walls[`${x + 4},${y + 12}`] = true // 4x12 <-
    // bottom wall
    walls[`${x + 8},${y + 12}`] = true // 12x12
    walls[`${x + 12},${y + 12}`] = true // 12x12 <-
    // right wall
    walls[`${x + 12},${y + 8}`] = true // 12x8
    walls[`${x + 12},${y + 4}`] = true // 12x4 <-
    // top wall
    walls[`${x + 8},${y + 4}`] = true // 12x0
    // })
  },
  removeMapWalls(wallsArr: number[], walls: {[key: string]: boolean}) {
    // wallsArr.forEach((wall: number[]) => {
    let x = wallsArr[0] * 16 //tile X
    let y = wallsArr[1] * 16 //tile Y

    // left wall
    delete walls[`${x + 4},${y + 4}`] // 4x4 <-
    delete walls[`${x + 4},${y + 8}`] // 4x8
    delete walls[`${x + 4},${y + 12}`] // 4x12 <-
    // bottom wall
    delete walls[`${x + 8},${y + 12}`] // 12x12
    delete walls[`${x + 12},${y + 12}`] // 12x12 <-
    // right wall
    delete walls[`${x + 12},${y + 8}`] // 12x8
    delete walls[`${x + 12},${y + 4}`] // 12x4 <-
    // top wall
    delete walls[`${x + 8},${y + 4}`] // 12x0
    // })
  },
  emitEvent(name: string, detail: any) {
    const event = new CustomEvent(name, {
      detail
    })

    document.dispatchEvent(event)
  },
  checkSomeoneInFront(originX: number, originY: number, direction: string) {
    if (direction === "up") {
      let middleX = originX + 8
      let middleY = originY
      return [`${middleX - 4},${middleY - 16}`, `${middleX - 8},${middleY - 16}`, `${middleX - 12},${middleY - 16}`]
    } else if (direction === "down") {
      let middleX = originX + 8
      let middleY = originY + 16
      return [`${middleX - 4},${middleY}`, `${middleX - 8},${middleY}`, `${middleX - 12},${middleY}`]
    } else if (direction === "right") {
      let middleX = originX + 16
      let middleY = originY + 8
      return [`${middleX},${middleY - 4}`, `${middleX},${middleY - 8}`, `${middleX},${middleY - 12}`]
    } else if (direction === "left") {
      let middleX = originX
      let middleY = originY + 8
      return [`${middleX - 16},${middleY - 4}`, `${middleX - 16},${middleY - 8}`, `${middleX - 16},${middleY - 12}`]
    } else {
      return ["0,0"]
    }
  },
  checkCutsceneAtTile(originX: number, originY: number, direction: string) {
    if (direction === "up") {
      let middleX = originX + 8
      let middleY = originY
      return [`${middleX - 4},${middleY}`, `${middleX - 8},${middleY}`, `${middleX - 12},${middleY}`]
    } else if (direction === "down") {
      let middleX = originX + 8
      let middleY = originY + 16
      return [`${middleX - 4},${middleY}`, `${middleX - 8},${middleY}`, `${middleX - 12},${middleY}`]
    } else if (direction === "right") {
      let middleX = originX
      let middleY = originY + 8
      return [`${middleX},${middleY - 4}`, `${middleX},${middleY - 8}`, `${middleX},${middleY - 12}`]
    } else if (direction === "left") {
      let middleX = originX
      let middleY = originY + 8
      return [`${middleX},${middleY - 4}`, `${middleX},${middleY - 8}`, `${middleX},${middleY - 12}`]
    } else {
      return ["0,0"]
    }
  },
  oppositeDirection(direction: string) {
    return direction === "right" ? "left" : direction === "left" ? "right" : direction === "down" ? "up" : "down"
  },
  getOneDirection(direction: string) {
    return direction.split("-")[0]
  }
}
