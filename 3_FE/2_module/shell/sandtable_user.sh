#!/bin/sh

export PATH &&
cd SandTable &&
git pull &&
echo "最新代码以拉取完毕, 可通过日志查看 ..."
echo "部署操作 : 执行sudo su admin -> 运行 sandtable_admin.sh ... "