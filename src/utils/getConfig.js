import { getAppDataPath } from './getPath'
import { defaultConfig } from './defaultConfig'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

// function that returns the path to the app's config file
// (the file where the app's config is stored)
export function getConfigPath() {
  return join(getAppDataPath(), 'config.json')
}

// function that returns the app's config
export function getConfig() {
  const configPath = getConfigPath()
  if (existsSync(configPath)) {
    let tempConf = JSON.parse(readFileSync(configPath, 'utf8'))
    if (tempConf === undefined) return initConfig()
    for (const key in tempConf)
      if (defaultConfig[key] === undefined)
        return initConfig()
    return tempConf
  }
  else initConfig()
}

// function that saves the app's config
export function saveConfig(config) {
  const configPath = getConfigPath()
  writeFileSync(configPath, JSON.stringify(config, null, 2))
}

// function that inital the app's config
export function initConfig() {
  saveConfig(defaultConfig)
  return defaultConfig
}