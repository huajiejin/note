# nginx

``` bash
# mac
brew install nginx
# 默认配置文件
/usr/local/etc/nginx/nginx.conf
# error: static 403 解决办法
  # 查看用户名 username
  whoami
  # 查看组名 groupname
  id -g -n $whoami
  # 修改配置/usr/local/etc/nginx/nginx.conf
  user username groupname;
```

``` bash
# 参考 http://www.nginx.cn/nginxchscommandline
# 指定一个配置文件，替代缺省
nginx -c
# 重载
sudo nginx -s reload
```