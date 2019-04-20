# vim

``` bash
# 默认进入或Esc回到命令模式（Command mode） i 插入模式（Insert mode） : 底线命令模式（Last line mode）
# 参考网址 http://www.runoob.com/linux/linux-vim.html
```

``` bash
# Command mode
# 方向 左 下 上 右 向下10行
h j k l 10j
# 光标移到当前行 首 尾 
0 $
# 光标移到文档 第一行 最后一行 第n行
gg G nG
# 光标移到屏幕 第一行 中间 最后一行
H M L
# 屏幕移动一页 向下 向上
ctrl + f ctrl + b
# 选中
v / V
# 选中后 Command + v 删除选中内容并粘贴
# 复制 剪切 光标所在行 向下n行
yy nyy
dd ndd
# 粘贴 向下 向上
p P
# 删除字符 向后 向前 删10个字符
x X 10x
# 撤销
u
# 重做
ctrl + r
# 重复上一个命令
.
```

``` bash
# Insert mode
```

``` bash
# Last line mode
```