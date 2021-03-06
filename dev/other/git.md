# git

``` bash
# 忽略已追踪的文件
git rm -r --cached <path | file>

# 查看 删除 新增源地址 首次push
git remote -v
git remote remove origin
git remote add origin neworigin
git push -u origin master

# 查看变更
git diff < . | file >
git diff --cached
git diff HEAD

# 撤销变更
# before git add
git checkout <path | file>
# after git add , before git commit
git reset HEAD <path | file>
# after git commit
git reset --hard <commit-id>
# 撤销上次commit 保留git add
git reset --soft [HEAD^ | HEAD~1]

# 删除本地分支
git branch -d <branch-name>
# 删除远程分支
git branch -r -d origin/<branch-name>
git push origin --delete <branch-name>
git push origin :<branch-name>

# 打开配置
git config --edit

# 合并dev分支部分文件到master 直接checkout会覆盖原文件
git checkout -b <master-tmp>
git merge dev
git checkout master
git checkout <master-tmp> <file1 file2...>
git branch -D <master-tmp>

# 正则匹配批量删除分支
git branch -r | awk -F/ '/./{print $2}' | xargs -I {} git push origin :{}

# 拉所有远程分支
git fetch --all
git branch -r | grep -v '\->' | while read remote; do git branch --track "${remote#origin/}" "$remote"; done
git pull --all

# 删除远程分支后git branch -a依然可见
git remote show origin
git remote prune origin

# 缓存
git stash
git stash save -u ["注释"]
git stash list
git stash pop
git stash show
git stash drop stash@{0}
```