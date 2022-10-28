#!/bin/bash
echo -n "请输入要发布的项目: "
read LIBPROJECT

#判断输入的项目是否可构建
if [ ${LIBPROJECT} = 'front-end-lib' ] || [ ${LIBPROJECT} = 'common-panel' ]
then
    echo "开始构建 ${LIBPROJECT} 项目"
else
    echo "${LIBPROJECT} 项目不存在，请确认后重试。"
    exit
fi

#echo "移除 lib 中的旧组件..."
#rm -rf projects/${LIBPROJECT}/src/lib/*
#echo "复制新的组件到 lib 中..."
#cp -r src/app/${LIBPROJECT}/* projects/${LIBPROJECT}/src/lib
echo "读取当前版本..."
CURRENTVERSION=`grep version projects/${LIBPROJECT}/package.json`;
CURRENTVERSION=${CURRENTVERSION##*:}
CURRENTVERSION=${CURRENTVERSION#*\"}
CURRENTVERSION=${CURRENTVERSION%%\",}
CURRENTVERSION=${CURRENTVERSION##*:}
echo "当前版本: "${CURRENTVERSION}
echo -n "请输入新的版本号:"
read NEWVERSION
#version 字段替换
sed -i '' "s/${CURRENTVERSION}/${NEWVERSION}/g" projects/${LIBPROJECT}/package.json
echo "开始构建版本 v${NEWVERSION}"
set -o errexit
ng build ${LIBPROJECT}
echo "打包完成，开始复制静态资源"
cp -r src/resource/assets dist/${LIBPROJECT}
echo "静态资源复制完毕，准备发布"
cd dist/${LIBPROJECT}
npm publish