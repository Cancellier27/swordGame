"use strict";
class PauseMenu {
    constructor({ onComplete }) {
        this.onComplete = onComplete;
    }
    close() {
        var _a;
        (_a = this.esc) === null || _a === void 0 ? void 0 : _a.unbind();
        this.onComplete();
    }
    init() {
        console.log("Pause class created!");
        this.esc = new KeyPressListener("Escape", () => this.close());
    }
}
