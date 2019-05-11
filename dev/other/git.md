# git

``` bash
# 忽略已追踪的文件
git rm -r --cached [path | file]

# 查看 删除 新增源地址 首次push
git remote -v
git remote remove origin
git remote add origin neworigin
git push -u origin master

# 删除本地分支
git branch -d <branch-name>
# 删除远程分支
git branch -r -d origin/<branch-name>
git push origin --delete <branch-name>
git push origin :<branch-name>

```