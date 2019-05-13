# deploy.circleci.sh
#! /bin/bash
set -e
cd `dirname $0`

npx vuepress build

NOW=`date "+%Y-%m-%d %H:%M:%S"`
COMMIT_MSG="deploy $NOW"

cp -r .circleci .vuepress/dist/
cd .vuepress/dist
git init
git config user.name huajie
git config user.email huajiejin@qq.com
git add .
git commit "-m$COMMIT_MSG"
git push -f git@github.com:huajiejin/note.git master:gh-pages
