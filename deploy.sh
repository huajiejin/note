#! /bin/bash
set -e

vuepress build

NOW=`date "+%Y-%m-%d %H:%M:%S"`
COMMIT_MSG="deploy $NOW"

cd .vuepress/dist
git init
git config user.name huajie
git config user.email huajiejin@qq.com
git add .
git commit "-m$COMMIT_MSG"
git push -f git@github.com:huajiejin/note.git master:gh-pages

cd -
git config user.name huajie
git config user.email huajiejin@qq.com
git add .
git commit "-m$COMMIT_MSG"
git pull
git push
