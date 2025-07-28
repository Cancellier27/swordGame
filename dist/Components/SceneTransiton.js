"use strict";
class SceneTransition {
    constructor() {
        this.element = null;
    }
    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("SceneTransition");
    }
    fadeOut() {
        // safety check
        if (!this.element)
            return;
        // func ...
        this.element.classList.add("fade-out");
        // to run only once
        this.element.addEventListener("animationend", () => {
            // safety check
            if (!this.element)
                return;
            // func ...
            this.element.remove();
        }, { once: true });
    }
    init(container, callback) {
        // func ...
        this.createElement();
        if (!this.element)
            return;
        container.appendChild(this.element);
        // to run only once
        this.element.addEventListener("animationend", () => {
            callback();
        }, { once: true });
    }
}
