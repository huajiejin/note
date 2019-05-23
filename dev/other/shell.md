# shell
``` bash
# 声明解释器 设置错误中止 跳到脚本所在路径
#!/bin/bash
set -e
cd `dirname $0`
```

## cpu运算能力简单测试
``` bash
python -c 'import test.pystone;print test.pystone.pystones()'
```