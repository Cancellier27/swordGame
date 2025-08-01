import {app, BrowserWindow} from "electron"
import * as path from "path"

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1300,
    height: 820,
    webPreferences: {
      // preload: path.join(__dirname, "preload.js"),
      contextIsolation: true
    }
  })

  win.loadFile(path.join("C:/Dev/SWORD_GAME/dist", "index.html"))
}

app.whenReady().then(() => {
  createWindow()

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})

