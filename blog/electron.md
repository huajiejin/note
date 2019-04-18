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

## 爬虫
``` bash
# PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 yarn add puppeteer -S
yarn add nightmare -S
```

## 其他
``` bash
# 解压asar
npx asar extract app.asar ./
```
