"use strict";
class OverWorld {
    constructor(config) {
        this.element = config.element;
        const canvas = this.element.querySelector(".game-canvas");
        if (!canvas) {
            throw new Error('Canvas element with class "game-canvas" not found.');
        }
        this.canvas = canvas;
        const ctx = this.canvas.getContext("2d");
        if (!ctx) {
            throw new Error("2D rendering context not supported or canvas already initialized.");
        }
        this.ctx = ctx;
    }
    init() {
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0);
        };
        image.src = "../images/maps/DemoLower.png";
        const x = 5;
        const y = 6;
        const shadow = new Image();
        shadow.onload = () => {
            this.ctx.drawImage(shadow, 0, //left cut
            0, //top cut,
            32, //width of cut
            32, //height of cut
            x * 16 - 8, y * 16 - 18, 32, 32);
        };
        shadow.src = "../images/characters/shadow.png";
        const hero = new Image();
        hero.onload = () => {
            this.ctx.drawImage(hero, 0, //left cut
            0, //top cut,
            32, //width of cut
            32, //height of cut
            x * 16 - 8, y * 16 - 18, 32, 32);
        };
        hero.src = "../images/characters/people/hero.png";
    }
}
