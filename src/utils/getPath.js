const remote = require("@electron/remote");
const { app } = remote

// function that returns the path to the app's data directory
// (the directory where the app's data is stored)

export function getAppDataPath() {
  return app.getPath('userData')
}