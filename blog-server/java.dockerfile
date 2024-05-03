#使用java环境，anapsix/alpine-java:latest java环境的镜像
FROM openjdk:17
# 项目的端口，内部服务端口
EXPOSE 7777
# 切换到容器内部的 /workdir目录
WORKDIR /usr/software/server
# 添加要运行的jar文件
COPY target/blog-server-1.0-SNAPSHOT.jar /usr/software/server/blogApp.jar
# 容器启动后运行的命令
ENTRYPOINT ["java","-jar","-Djasypt.encryptor.password=d6683efc052d1452","/usr/software/server/blogApp.jar"]
