# ssh

```bash
# 生成密钥
ssh-keygen -t rsa -C "user@email.com" -f ~/.ssh/name
ssh-add ~/.ssh/name

# 配置别名
vi ~/.ssh/config

Host aliasName # 别名
HostName 101.200.123.63 # 主机名 ip/url
Port 222 # 端口号 默认22
User root # 用户名
IdentityFile ~/.ssh/id_rsa # 私钥文件路径

# 登陆服务器
ssh User@HostName
ssh alisaName

# github连接测试
ssh -T git@aliasName

# 配置免密登陆
vi authorized_keys
```

``` bash
# CentOS
# ssh配置 Port 字段支持多个
vi /etc/ssh/sshd_config
# 重启命令
service sshd restart
```
