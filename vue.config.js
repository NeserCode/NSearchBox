const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: 'assets',
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    }
  }
})