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
    <p class="TextMessage_p" ></p>
    <button class="TextMessage_button" > &gt;Next&lt; </button>
    `;
        // init the typewriter effect
        const textElement = this.element.querySelector(".TextMessage_p");
        if (!textElement) {
            throw new Error("TextMessage_p element not found");
        }
        this.revealingText = new RevealingText({
            text: this.text,
            element: textElement
        });
        (_a = this.element.querySelector("button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            // close text message
            this.done();
        });
        this.actionListener = new KeyPressListener("Enter", () => {
            // unbind the enter button
            this.done();
        });
    }
    done() {
        if (this.revealingText.isDone) {
            this.element.remove();
            this.actionListener.unbind();
            this.onComplete();
        }
        else {
            this.revealingText.warpToDone();
        }
    }
    init(container) {
        this.createElement();
        container.appendChild(this.element);
        this.revealingText.init();
    }
}
