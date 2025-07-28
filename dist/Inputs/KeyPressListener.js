"use strict";
class KeyPressListener {
    constructor(keyCode, callback) {
        this.keySafe = true;
        this.keyDownFunction = (event) => {
            // You may need to define 'keyCode' or pass it via config
            if (event.code === keyCode) {
                // Example key code
                if (this.keySafe) {
                    this.keySafe = false;
                    callback();
                }
            }
        };
        this.keyUpFunction = (event) => {
            // You may need to define 'keyCode' or pass it via config
            if (event.code === keyCode) {
                // Example key code
                this.keySafe = true;
            }
        };
        document.addEventListener("keydown", this.keyDownFunction);
        document.addEventListener("keyup", this.keyUpFunction);
    }
    unbind() {
        document.removeEventListener("keydown", this.keyDownFunction);
        document.removeEventListener("keyup", this.keyUpFunction);
    }
}
