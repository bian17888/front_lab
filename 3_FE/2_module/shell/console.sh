#!/bin/sh
CONSOLE_HOME=/data/projects/console
TOMCAT_HOME=/data/web/cdn/apache-tomcat-7.0.55

export PATH &&
cd $CONSOLE_HOME &&
git pull &&
mvn clean &&
mvn install &&
echo "清理tomcat缓存"
rm -rf ${TOMCAT_HOME}/work/* &&
echo "清理缓存完成"
${TOMCAT_HOME}/bin/catalina.sh stop &&
#echo "开始清理发布目录"
rm -fr /data/web/cdn/ksyunConsole &&
#rm -rf /data/web/cdn/ksyunConsole.war &&
echo "清理完成"
#cp ${CONSOLE_HOME}/target/console.war ${TOMCAT_HOME}/webapps &&
#cp ${CONSOLE_HOME}/target/ksyunConsole.war /data/web/cdn &&
cp -rf  ${CONSOLE_HOME}/target/ksyunConsole /data/web/cdn &&
#${TOMCAT_HOME}/bin/catalina.sh stop &&
${TOMCAT_HOME}/bin/catalina.sh start
echo "发布成功"