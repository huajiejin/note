---
sidebarDepth: 0
---
# 本站创建记录

::: tip 运行环境
node 10.15.3  
npm 5.3.0  
:::

## 安装并配置 Vuepress
``` bash
npm i -g vuepress
# mkdir reponame && echo "Hello World" > reponame/READEME.md
# 参考官方文档写配置文件reponame/.vuepress/config.js
vuepress dev
# 或者
npm i vuepress
npx vuepress dev
```

## 本地执行脚本部署到 GitHub Pages
<<< @/deploy.sh
``` bash
# 关键代码，把dist目录强推到gh-pages分支
git push -f git@github.com:username/reponame.git master:gh-pages
# 访问路径 https://username.github.io/reponame/
```

## 添加自动集成 Circleci
为了实现任意客户端push到master后自动部署  
1. 使用Github授权登陆[Circleci](https://circleci.com/)  
2. 点击Add Project选择reponame仓库，选择linux，node环境  
3. 设置User Key  
3.1 点击SETTINGS  
3.2 点击Projects  
3.3 点击reponame项目右上角的设置按钮  
3.4 点击PERMISSIONS分类下的Checkout SSH keys  
3.5 点击Add user key  
3.6 点击Authorize with GitHub按钮授权  
3.7 点击Create and add user key按钮  
4. 配置reponame/.circleci/config.yml  

<<< @/.circleci/config.yml
<<< @/deploy.circleci.sh
