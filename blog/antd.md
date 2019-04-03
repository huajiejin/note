# 创建一个按需加载的antd项目

``` bash
# 以下内容从官方文档搬运整合而来
# https://ant.design/docs/react/use-with-create-react-app-cn

# 安装Yarn（mac以外系统参考文档：https://yarn.bootcss.com/docs/install）
brew install yarn

# 创建并启动项目
yarn create react-app antd-demo
cd antd-demo
yarn start

# 安装依赖
yarn add antd
yarn add react-app-rewired customize-cra babel-plugin-import -D

# 配置
# 根目录下创建config-overrides.js
# const { override, fixBabelImports } = require('customize-cra');
# module.exports = override(
#   fixBabelImports('import', {
#     libraryName: 'antd',
#     libraryDirectory: 'es',
#     style: 'css',
#   }),
# );

# 修改package.json
# "scripts": {
#   "start": "react-app-rewired start",
#   "build": "react-app-rewired build",
#   "test": "react-app-rewired test",
# }

# 重启测试
# App.js中添加代码
# import { Button } from 'antd';
# <Button type="primary">Button</Button>
yarn start

```