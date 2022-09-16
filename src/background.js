'use strict'

import path from 'path'
import {
  app, protocol, BrowserWindow, globalShortcut, Tray, Menu, nativeImage
} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
require('@electron/remote/main').initialize()
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let win, tray, trayIcon;

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 840,
    height: 66,
    transparent: true,
    frame: false,
    resizable: false,
    center: false,
    webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,

      spellcheck: false
    },
  })

  globalShortcut.register('CommandOrControl+Q', () => {
    win.reload()
  })
  globalShortcut.register('CommandOrControl+E', () => {
    win.openDevTools()
  })
  globalShortcut.register('CommandOrControl+Space', () => {
    win.show()
  })
  globalShortcut.register('CommandOrControl+D', () => {
    win.webContents.send('app-toggle-dark-mode')
  })

  win.on('focus', () => {
    win.webContents.send('app-get-focus')
  })
  win.on('blur', () => {
    win.webContents.send('app-get-blur')
    win.hide()
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

app.whenReady().then(() => {
  trayIcon = nativeImage.createFromPath(path.resolve(__dirname, '../public/vue.logo.png'));

  tray = new Tray(trayIcon)
  tray.setToolTip('This is my application')
  tray.setTitle('This is my title')
  tray.on('click', () => {
    win.show()
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  //   // Install Vue Devtools
  //   try {
  //     await installExtension(VUEJS3_DEVTOOLS)
  //   } catch (e) {
  //     console.error('Vue Devtools failed to install:', e.toString())
  //   }
  // }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}