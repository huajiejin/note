# 本站创建记录

## 本地环境
node 10.15.3  
npm 6.4.1  

## 安装并配置 Vuepress
``` bash
npm i -g vuepress
# mkdir note && "Hello World" > note/READEME.md
# 参考官方文档写配置文件note/.vuepress/config.js
vuepress dev
```

## 本地执行脚本部署到 GitHub Pages
<<< @/deploy.sh
``` bash
# 关键代码，把dist目录强推到gh-pages分支
git push -f git@github.com:name/repo.git master:gh-pages
```

## 添加自动集成 Circleci
为了实现任意客户端push到master后自动部署  
1. 使用Github授权登陆[Circleci](https://circleci.com/)  
2. 点击Add Project选择note仓库，选择linux，node环境  
3. 设置User Key，SETTINGS -> Projects -> 点击note项目右上角的设置按钮 -> PERMISSIONS,Checkout SSH keys,Add user key,点击Authorize with GitHub按钮 -> 点击Create and add user key按钮  
4. 配置note/.circleci/config.yml