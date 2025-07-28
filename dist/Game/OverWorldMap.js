"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class OverWorldMap {
    constructor(config) {
        this.overWorld = null;
        // references the gameObjects to be used here
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};
        this.cutsceneSpaces = config.cutsceneSpaces || {};
        // load the lower image of the map
        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;
        // lower the upper image of the map
        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
        this.isCutscenePlaying = false;
        // check if player is attacking
        this.attacking = new Attack({ map: this });
        this.attacking.init();
        // mount map walls
        this.collisionData = config.collisionData;
        this.mountMapWalls(this.collisionData);
        this.isPaused = false;
    }
    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(this.lowerImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }
    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(this.upperImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }
    drawCollisionPoints(ctx, cameraPerson) {
        Object.keys(this.walls).forEach((wall) => {
            let coord = wall.split(",");
            let x = Number(coord[0]) - cameraPerson.x + utils.withGrid(10.5);
            let y = Number(coord[1]) - cameraPerson.y + utils.withGrid(6);
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, 2 * Math.PI); // (x, y, radius, startAngle, endAngle)
            ctx.fillStyle = "red"; // Fill color
            ctx.fill(); // Fill the circle
        });
    }
    mountObjects() {
        Object.keys(this.gameObjects).forEach((key) => {
            let object = this.gameObjects[key];
            // set the id for each character automatically
            object.id = key;
            // TODO, determine if this element should really mount
            object.mount(this);
        });
    }
    mountMapWalls(collisionData) {
        for (let y = 0; y < collisionData.length; y++) {
            for (let x = 0; x < collisionData[0].length; x++) {
                if (collisionData[y][x] !== 0) {
                    utils.createMapWalls([x, y], this.walls);
                }
            }
        }
    }
    isSpaceTaken(currentX, currentY, direction) {
        const positions = utils.nextPosition(currentX, currentY, direction);
        if (!positions) {
            return false;
        }
        const [pos1, pos2, pos3, pos4, pos5] = positions;
        if (pos4 && pos5) {
            return (this.walls[`${pos1[0]},${pos1[1]}`] ||
                this.walls[`${pos2[0]},${pos2[1]}`] ||
                this.walls[`${pos3[0]},${pos3[1]}`] ||
                this.walls[`${pos4[0]},${pos4[1]}`] ||
                this.walls[`${pos5[0]},${pos5[1]}`] ||
                false);
        }
        else {
            return (this.walls[`${pos1[0]},${pos1[1]}`] ||
                this.walls[`${pos2[0]},${pos2[1]}`] ||
                this.walls[`${pos3[0]},${pos3[1]}`] ||
                false);
        }
    }
    startCutscene(events) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isCutscenePlaying = true;
            // Start a loop of async events and await for each one
            for (let i = 0; i < events.length; i++) {
                // if it is walking, run it 4 times
                if (events[i].type === "walk") {
                    for (let j = 0; j < 4; j++) {
                        const eventHandler = new OverWorldEvent({
                            event: events[i],
                            map: this
                        });
                        yield eventHandler.init();
                    }
                }
                else {
                    const eventHandler = new OverWorldEvent({
                        event: events[i],
                        map: this
                    });
                    yield eventHandler.init();
                }
            }
            this.isCutscenePlaying = false;
            // reset NPCs to do their behaviors
            Object.values(this.gameObjects).forEach((object) => object.doBehaviorEvent(this));
        });
    }
    checkForActionCutscene() {
        const hero = this.gameObjects["hero"];
        const nextCoords = utils.checkSomeoneInFront(hero.x, hero.y, hero.direction);
        const match = Object.values(this.gameObjects).find((object) => {
            return (`${object.x},${object.y}` === nextCoords[0] ||
                `${object.x},${object.y}` === nextCoords[1] ||
                `${object.x},${object.y}` === nextCoords[2]);
        });
        if (!this.isCutscenePlaying && match && match.talking.length) {
            // if people have event, fire them here
            this.startCutscene(match.talking[0].events);
        }
    }
    checkForFootstepCutscene() {
        const hero = this.gameObjects["hero"];
        const match = Object.keys(this.cutsceneSpaces).find((cutsceneLine) => {
            const inline = utils.getInlinePoints(cutsceneLine);
            // console.log(inline)
            if (inline.axis === "x") {
                return inline.start <= hero.x && inline.end >= hero.x && inline.level === hero.y;
            }
            else {
                return inline.start <= hero.y && inline.end >= hero.y && inline.level === hero.x;
            }
        });
        if (match && !this.isCutscenePlaying) {
            this.startCutscene(this.cutsceneSpaces[match][0].events);
        }
    }
    loadObjectsState() {
        Object.keys(this.gameObjects).forEach((key) => {
            if (key === "hero") {
                this.gameObjects[key]["state"] = PlayerState;
            }
            else {
                let enemyClass = key.split("_")[0];
                this.gameObjects[key]["state"] = Object.assign({}, EnemyState[enemyClass]);
            }
        });
    }
    // walls functions, add, remove and move
    // NOT multiplied by 16
    addWall(x, y) {
        utils.createMapWalls([x, y], this.walls);
    }
    // NOT multiplied by 16
    removeWall(x, y) {
        utils.removeMapWalls([x, y], this.walls);
    }
    // TO BE multiplied by 16
    moveWall(wasX, wasY, direction) {
        // compensate the grid by dividing by 16
        this.removeWall(wasX / 16, wasY / 16);
        const { x, y } = utils.nextPositionOrigin(wasX, wasY, direction);
        // compensate the grid by dividing by 16
        this.addWall(x / 16, y / 16);
    }
}
