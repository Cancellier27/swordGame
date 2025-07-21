type voidFunc = () => void

interface TextMessageConfig {
  text: string
  onComplete: voidFunc
}

class TextMessage {
  text: string
  onComplete: voidFunc
  element!: HTMLElement

  constructor(config: TextMessageConfig) {
    this.text = config.text
    this.onComplete = config.onComplete
  }

  createElement() {
    // create the element
    this.element = document.createElement("div")
    this.element.classList.add("TextMessage")

    this.element.innerHTML = `
          <p class="textMessage_p" >${this.text}</p>
          <button class="textMessage_button >Next</button>
        `
  }

  init(container: HTMLElement) {
    this.createElement()
    container.appendChild(this.element)
  }
}
