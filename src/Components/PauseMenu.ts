class PauseMenu {
  onComplete: () => void
  esc!: KeyPressListener
  enter!: KeyPressListener
  mainContainer!: HTMLElement
  element!: HTMLDivElement
  leftIndex: number
  leftKeyPressFn!: (e: KeyboardEvent) => void

  constructor({onComplete}: {onComplete: () => void}) {
    this.onComplete = onComplete
    this.leftIndex = 0
  }

  pauseMenuMainPage() {
    const liItems = [...document.querySelectorAll(".left-ul li")]

    function updateSelection(index: number) {
      liItems.forEach((item, i) => {
        item.classList.toggle("selected-left", i === index)
      })
    }

    updateSelection(this.leftIndex)

    this.leftKeyPressFn = (e) => {
      if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") {
        this.leftIndex = (this.leftIndex + 1) % liItems.length
        updateSelection(this.leftIndex)
      } else if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") {
        this.leftIndex = (this.leftIndex - 1 + liItems.length) % liItems.length
        updateSelection(this.leftIndex)
      }
    }

    document.addEventListener("keydown", this.leftKeyPressFn)
    
    this.enter = new KeyPressListener("Enter", () => {
      let selectedItem = liItems.filter((item) => item.className)[0].textContent?.substring(1)

      if (selectedItem) {
        this.populateRightSide(selectedItem)
      }
    })
  }

  populateRightSide(item: string) {
    const rightContainer = document.querySelector(".pause-list-right")

    if (!rightContainer) return

    if (item === "Character") {
      rightContainer.innerHTML = `
    <ul class="left-ul">
      <li>Character</li>
    </ul>`
    }
    if (item === "Items") {
      rightContainer.innerHTML = `
    <ul class="left-ul">
      <li>Items</li>
    </ul>`
    }
    if (item === "Map") {
      rightContainer.innerHTML = `
    <ul class="left-ul">
      <li>Map</li>
    </ul>`
    }
    if (item === "Save") {
      rightContainer.innerHTML = `
    <ul class="left-ul">
      <li>Save</li>
    </ul>`
    }
    if (item === "Quit") {
      rightContainer.innerHTML = `
    <ul class="left-ul">
      <li>Quit</li>
    </ul>`
    }
  }

  close() {
    this.esc?.unbind()
    this.enter?.unbind()
    this.onComplete()
    this.element.remove()
    document.removeEventListener("keydown", this.leftKeyPressFn)
  }

  init() {
    this.mainContainer = document.querySelector(".game-container") as HTMLElement
    this.element = document.createElement("div") as HTMLDivElement
    this.element.classList.add("pause-menu-element")

    this.element.innerHTML = `
<h3>Pause</h3>
<div class="pause-list-container">
  <div class="pause-list-left">
    <ul class="left-ul">
      <li><span class="left-selector">&gt;</span>Character</li>
      <li><span class="left-selector">&gt;</span>Items</li>
      <li><span class="left-selector">&gt;</span>Map</li>
      <li><span class="left-selector">&gt;</span>Save</li>
      <li><span class="left-selector">&gt;</span>Quit</li>
    </ul>
  </div>
  <div class="pause-list-right">
    
  </div>
</div>
`

    this.mainContainer.appendChild(this.element)
    this.esc = new KeyPressListener("Escape", () => this.close())

    this.pauseMenuMainPage()
    this.populateRightSide("Character")
  }
}
