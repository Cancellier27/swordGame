type voidFunc = () => void

interface TextMessageConfig {
  text: string
  onComplete: voidFunc
}

class TextMessage {
  text: string
  onComplete: voidFunc
  element!: HTMLElement
  actionListener!: KeyPressListener
  revealingText!: RevealingText

  constructor(config: TextMessageConfig) {
    this.text = config.text
    this.onComplete = config.onComplete
  }

  createElement() {
    // create the element
    this.element = document.createElement("div")
    this.element.classList.add("TextMessage")

    this.element.innerHTML = `
    <p class="TextMessage_p" ></p>
    <button class="TextMessage_button" > &gt;Next&lt; </button>
    `

    // init the typewriter effect
    const textElement = this.element.querySelector(".TextMessage_p") as HTMLElement
    if (!textElement) {
      throw new Error("TextMessage_p element not found")
    }
    this.revealingText = new RevealingText({
      text: this.text,
      element: textElement
    })

    this.element.querySelector("button")?.addEventListener("click", () => {
      // close text message
      this.done()
    })

    this.actionListener = new KeyPressListener("Enter", () => {
      // unbind the enter button

      this.done()
    })
  }

  done() {
    if (this.revealingText.isDone) {
      this.element.remove()
      this.actionListener.unbind()
      this.onComplete()
    } else {
      this.revealingText.warpToDone()
    }
  }

  init(container: HTMLElement) {
    this.createElement()
    container.appendChild(this.element)
    this.revealingText.init()
  }
}
