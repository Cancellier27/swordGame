class PauseMenu {
  onComplete: () => void
  esc!: KeyPressListener

  constructor({onComplete}: {onComplete: () => void}) {
    this.onComplete = onComplete
  }

  close() {
    this.esc?.unbind()
    this.onComplete()
  }

  init() {
    console.log("Pause class created!")
    this.esc = new KeyPressListener("Escape", () => this.close())
  }
}
