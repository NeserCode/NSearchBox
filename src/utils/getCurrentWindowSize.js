const remote = require("@electron/remote");

export function getCurrentWindowSize() {
  return {
    width: remote.getCurrentWindow().getSize()[0],
    height: remote.getCurrentWindow().getSize()[1]
  }
}