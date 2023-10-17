docker打镜像的命令

```
docker build -t name:tag -f filename .
```
. 表示的是上下问的目录

.dockerignore

```
*.md
node_modules/
```
忽略所有md结尾的文件，node_modules下的文件

docker build的时候会先解析.dockerignore把该忽略的东西忽略


``` dockerfile
FORM node:18

WORKDIR /app

COPY package.json

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node",'./dist/main.js']
```
基于node18的镜像
指定当前目录为容器内的/app
复制package.json文件，设置npm源是npmmirror，执行npm install
复制其余文件
指定暴露的端口为3000，执行node ./dist/main.js命令


```
docker build -t nest:first
```
