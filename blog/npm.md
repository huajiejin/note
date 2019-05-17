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
# 前台启动
docker-compose up
# 后台启动
docker-compose up -d
```
## 解决写文件权限问题

### 错误表现
执行`npm adduser --registry http://ksc-002:8868`添加用户时，执行`docker-compose logs`可以看到报了没有权限写`/verdaccio/conf/htpasswd`，同理`plugins storage`目录也无法写。

### 错误原因
执行`ls -l`可以看到，宿主环境中`conf plugins storage`的用户和组，跟容器内执行的用户和组并不一致
``` bash
# 查看容器中的用户和id, verdaccio是启动的容器名
docker exec -it verdaccio /bin/sh
# 进入容器后,查看当前用户和分组，用户id
whoami
groups
cat /etc/passwd
```
### 解决办法
1. 宿主中新建一个用户（名和id与容器中相同），更改宿主中三个目录的所属用户和组
2. 更改docker-compose.yml中的环境变量（VERDACCIO_USER_NAME VERDACCIO_USER_UID），用户名和id与宿主中三个目录的所属用户保持一致
