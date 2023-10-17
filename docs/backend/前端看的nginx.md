# docker安装nginx
### 镜像下载
在 dockerHub 找到nginx的镜像 https://hub.docker.com/_/nginx
在终端执行docker命令下载镜像
```
docker pull nginx
```
![[Pasted image 20230714223928.png]]

### 启动nginx服务
```
docker run --name nginx-sanmu -p 81:80 -d nginx
```
- docker run 是固定的启动命令
- --name 命名
- -p端口映射，x:y我们可以通过x访问容器的端口y
- -d 后台执行
所以，上面的命令就是说我们将镜像nginx启动一个服务，名字叫nginx-sanmu，并且将这个服务内部暴露出来的80端口，通过81映射。
现在我们可以通过localhost:81 看到这个页面
![[Pasted image 20230714224540.png]]

# 基础知识介绍
首先，我们先准备一个静态页面，index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  你好，三木
</body>
</html>
```
代码很简单，就是一个单纯展示文字index.html

 