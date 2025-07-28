interface KeyPressListenerConfig {
  keyCode: string
  callback: () => void
}

class KeyPressListener {
  keySafe: boolean
  keyDownFunction: (event: KeyboardEvent) => void
  keyUpFunction: (event: KeyboardEvent) => void

  constructor(keyCode: string, callback: () => void) {
    this.keySafe = true

    this.keyDownFunction = (event: KeyboardEvent) => {
      // You may need to define 'keyCode' or pass it via config
      if (event.code === keyCode) {
        // Example key code
        if (this.keySafe) {
          this.keySafe = false
          callback()
        }
      }
    }

    this.keyUpFunction = (event: KeyboardEvent) => {
      // You may need to define 'keyCode' or pass it via config
      if (event.code === keyCode) {
        // Example key code
        this.keySafe = true
      }
    }

    document.addEventListener("keydown", this.keyDownFunction)
    document.addEventListener("keyup", this.keyUpFunction)
  }

  unbind() {
    document.removeEventListener("keydown", this.keyDownFunction)
    document.removeEventListener("keyup", this.keyUpFunction)
  }
}
