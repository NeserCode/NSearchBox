const remote = require("@electron/remote");
const { BrowserWindow } = remote
import { defaultWindowOptions } from './defalutWindowOptions'

export function generateWindow(options) {
  const win = new BrowserWindow({ ...defaultWindowOptions, ...options })
  return win
}