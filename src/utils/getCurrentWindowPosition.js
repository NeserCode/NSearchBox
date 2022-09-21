const remote = require("@electron/remote");

export function getCurrentWindowPosition() {
  return {
    x: remote.getCurrentWindow().getPosition()[0],
    y: remote.getCurrentWindow().getPosition()[1]
  }
}

export function localStorageWindowPosition(position) {
  let lx = localStorage.getItem('atom_tools_position_x')
  let ly = localStorage.getItem('atom_tools_position_y')

  if (lx === position.x.toString() && ly === position.y.toString()) return false;
  else {
    localStorage.setItem('atom_tools_position_x', position.x.toString())
    localStorage.setItem('atom_tools_position_y', position.y.toString())
  }
}

export function getLocalStorageWindowPosition() {
  return {
    x: Number(localStorage.getItem('atom_tools_position_x')),
    y: Number(localStorage.getItem('atom_tools_position_y'))
  }
}