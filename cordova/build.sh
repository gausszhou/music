set -e
# 获取当前时间
time=$(date "+%Y%m%d%H%M%S")

git add .
git commit -m "$time $1"
npm run build
cp -r dist ./app/
cd app 
rm -rf www
mv dist www

# cordova run browser
# cordova build android
cordova run android

cd -