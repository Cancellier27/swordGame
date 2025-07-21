"use strict";
class TextMessage {
    constructor(config) {
        this.text = config.text;
        this.onComplete = config.onComplete;
    }
    createElement() {
        var _a;
        // create the element
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage");
        this.element.innerHTML = `
    <p class="textMessage_p" >${this.text}</p>
    <button class="TextMessage_button" > &gt;Next&lt; </button>
    `;
        (_a = this.element.querySelector("button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            // close text message
            this.done();
        });
        this.actionListener = new KeyPressListener("Enter", () => {
            // unbind the enter button
            this.actionListener.unbind();
            this.done();
        });
    }
    done() {
        this.element.remove();
        this.onComplete();
    }
    init(container) {
        this.createElement();
        container.appendChild(this.element);
    }
}
