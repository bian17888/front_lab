#!/bin/sh
ADMIN=/home/admin/jingpin/SandTable/frontEnd
USER=/home/zhuzhen.bk/project/SandTable/frontEnd

export PATH &&
cd $ADMIN &&
echo "重命名 : dist -> dist_backup ..."
mv ${ADMIN}/dist/ ${ADMIN}/dist_backup/ &&
echo "拷贝 : dist文件夹 ..."
cp -rf ${USER}/dist/. ${ADMIN}/dist/  &&
echo "重启pm2 ..."
pm2 restart all
echo "部署完成 ..."