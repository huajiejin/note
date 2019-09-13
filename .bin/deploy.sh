#!/bin/bash
set -e
cd `dirname $0` && cd ..

NOW=`date "+%Y-%m-%d %H:%M:%S"`
COMMIT_MSG="update $NOW"

if [ "$1" ]; then COMMIT_MSG="$1"; fi

git config user.name huajie
git config user.email huajiejin@qq.com
git add .
git commit "-m$COMMIT_MSG"
git pull
git push
