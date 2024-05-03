    # 安装精简版redis
FROM redis:7.2-alpine
# 开放端口
EXPOSE 16379
# 将redis的配置文件复制到容器内
COPY redis.conf /usr/local/etc/redis/redis.conf
# 创建log文件夹，用于映射redis log
RUN mkdir "/var/log/redis"
# 以配置文件的方式运行redis
ENTRYPOINT ["redis-server","/usr/local/etc/redis/redis.conf"]