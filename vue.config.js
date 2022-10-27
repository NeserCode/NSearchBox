const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: 'assets',
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        "appId": "com.nesercode.nseachbox.application",
        "productName": "NSearchBox", //项目名，也是生成的安装文件名，即demo.exe
        "copyright": "Copyright © 2021-2022 by NeserCode@github", //版权信息
        "directories": {
          "output": "./dist_electron" //输出文件路径
        },
        "asar": true,
        "nsis": {
          "oneClick": false, // 是否一键安装
          "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          "allowToChangeInstallationDirectory": true, // 允许修改安装目录
          "installerIcon": "./public/N.orange.ico", // 安装图标
          "uninstallerIcon": "./public/N.orange.ico", //卸载图标
          "installerHeaderIcon": "./public/N.orange.ico", // 安装时头部图标
          "createDesktopShortcut": true, // 创建桌面图标
          "createStartMenuShortcut": true, // 创建开始菜单图标
          "shortcutName": "NSearchBox", // 图标名称
        },
        "win": {
          "icon": "./public/N.orange.ico",
          "target": [{
            "target": "nsis", //利用nsis制作安装程序
          }]
        }
      }
    }
  }
})
