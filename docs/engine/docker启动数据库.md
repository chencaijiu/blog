# docker安装

[](https://www.docker.com/)[https://www.docker.com/](https://www.docker.com/)

安装完成之后，会有这样的软件

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5637f36e-1118-4098-8621-ed787167dd1e/Untitled.png)

运行这个软件后，你可以在终端docker相关的命令，`docker -`v 查看docker的版本

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c67dacb3-9192-4ad6-987f-a25f00cae9df/Untitled.png)

# docker下载mysql数据库

执行

```jsx
docker pull mysql
```

你变化看到下面的执行结果

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/42773c73-fa16-47c0-b46a-6b611dc7c8fb/Untitled.png)

通过这种方式，我们将mysql的镜像下载到了本地，之后执行

```jsx
docker images -a # -a表示所有
```

看到mysql镜像

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/14bedfe1-2f6d-4a4d-9adf-eb5cdd9a806a/Untitled.png)

有了mysql的镜像，便可以启动我们的数据库

```jsx
docker run -p 3306:3306 --name sanmu_mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql
```

-   -p 端口映射，外部主机可以直接通过 **宿主机ip:3306** 访问到 MySQL 的服务
-   —name 给容器取名
-   -e MYSQL_ROOT_PASSWORD=123456 设置数据库密码
-   -d 进程后台执行（不执行stop的命令，容器会一直执行，哪怕我们关闭了终端）

执行以上命令后，我们便可以看到下图

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/338e0524-cae0-42c3-9df5-44a14908e3bc/Untitled.png)

之后，通过以下命令查看容器是否启动成功

```bash
docker ps -a
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7f22f3df-f8fb-408f-afb7-a531a6be6769/Untitled.png)

通过上图，可以看到我们的name=sanmu_mysql数据就有了

通过上面的步骤，本地已经有mysql的数据库服务了。接下来，我们进行连接

1、打开一个sql可视化工具，这里我使用Navicat，选择Connetion后，选mysql

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/be18647c-ff03-4db0-97a9-ee45477a319c/Untitled.png)

2、name随意输入，Host=localhost，Port=我们之前命令对于的-p之后的端口映射，username我们没有设置，默认是root，密码之前我们设置的是123456

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/adba6565-03a4-447a-ad20-e1f80b870cb1/Untitled.png)

3、保存后，便可以在左侧看到一个新增的数据库，双击后，便可以连接了