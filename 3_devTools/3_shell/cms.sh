[root@vm10-0-3-202 ksc-fe-cms]# cat cms.sh 
#!/bin/sh
KSC_FE_CMS_HOME=/data/projects/ksc-fe-cms/ksc-fe-cms

export PATH &&
cd $KSC_FE_CMS_HOME &&
git pull &&
cp -r /data/projects/ksc-fe-cms/ksc-fe-cms/resources/* /data/web/newksyun/cms/site/ksyun/resources 

echo "资源文件已经是最新的了呢";