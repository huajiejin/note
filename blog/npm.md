# 搭建私有npm（基于verdaccio，使用Docker Compose）

## 参考文档
- verdaccio官方文档：[https://verdaccio.org/docs/zh-CN/installation](https://verdaccio.org/docs/zh-CN/installation)
- verdaccio官方配置示例：[https://github.com/verdaccio/docker-examples](https://github.com/verdaccio/docker-examples)

## 安装步骤
``` bash
# 安装docker docker-compose
# 创建verdaccio容器
# 获取官方镜像
docker pull verdaccio/verdaccio
# 新建项目目录和配置等子目录，例如：
mkdir my-npm && cd my-npm
mkdir conf plugins storage
# 参考官方文档和配置示例
touch conf/config.yaml conf/htpasswd
# 参考官方文档写docker-compose配置
touch docker-compose.yml
```

## 相关命令
``` bash
# my-npm目录下执行
# 前台执行
docker-compose up
# 后台执行
docker-compose up -d
```