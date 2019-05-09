# 创建一个electron项目

## 环境
- node v10.15.3
- npm v6.4.1
- yarn v1.12.3

## 使用electron-vue

### 安装
``` bash
npx vue-cli init simulatedgreg/electron-vue project-name
cd project-name
yarn
# 按需加载elementui的依赖
yarn add element-ui -S
yarn add babel-plugin-component -D
```

## 命令
``` bash
# 开发环境
npm run dev
# 构建
npm run build
# 打包
npm run pack
```

## 按需加载elementui

- 合并下面的配置到 .babelrc (electron-vue生成的默认配置添加上plugins参数)
``` json
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

## electron使用无头浏览器
``` bash
# puppeteer nightmare 当前不可用
# PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 yarn add puppeteer -S
# yarn add nightmare -S

# fork from nightmare
yarn add eramthgin
```

## 如何做config
``` js
// 1. localstorage 多开窗口时数据不同步
// 2. fs.writeSync(staticFile) 打包后可读不可写

// electron-store
const Store = require('electron-store')
global.store = new Store()
store.set('key', value)
store.get('key')
```

## 其他
``` bash
# 解压asar
npx asar extract app.asar ./app
```
