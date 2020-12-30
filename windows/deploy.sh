#!/usr/bin/env sh
# 确保脚本抛出遇到的错误
set -e
# 获取当前时间
time=$(date "+%Y%m%d%H%M%S")

rm -rf dist 
npm run build 
cd dist 
git init 
git add .
git commit -m "deploy $time"
git branch dist 
git checkout dist
# 推送到git托管仓库
git push  https://gitee.com/gausszhou/leran-music.git dist -f
# 打开管理网页
echo https://gitee.com/gausszhou/leran-music/pages
# 回到脚本执行时的目录
cd - 
# 脚本结束