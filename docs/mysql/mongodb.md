# Atlas 在线 MongoDB 数据存储

MongoDB Atlas 是一个全托管的云数据库服务，为开发人员提供了高度可靠和可扩展的 MongoDB 存储解决方案。今天介绍下 MongoDB Atlas 的使用教程。

通过 Atlas，开发人员可以快速创建、部署和扩展 MongoDB 集群，并享受高可用性、自动备份和监控等功能。

MongoDB Atlas 的优势

- 高可用性：Atlas 提供了自动故障转移和自动扩展，确保您的应用程序始终可用且具备弹性。
- 安全：Atlas 支持安全的连接以及高级的角色和权限管理，保护您的数据免受未经授权访问。
- 自动备份与恢复：Atlas 定期备份您的数据，并提供简单的恢复选项，确保您的数据安全可靠。
- 监控和优化：Atlas 提供了强大的监控工具，帮助您实时监测集群性能，并提供优化建议。

MongoDB Atlas 有免费的存储，对于学习来说非常方便。

## 操作教程

### 1. 注册 MongoDB Atlas 帐号

在开始使用 Atlas 之前，您需要注册一个 MongoDB Atlas 帐号。访问 MongoDB Atlas 官方网站（https://www.mongodb.com/cloud/atlas），点击 "Sign up"，按照步骤完成注册过程。

### 创建集群

在注册并登录 MongoDB Atlas 后，您需要创建一个新的集群，以存储和管理您的数据。
![](./assets/1.png)

### 3. 选择云提供商与地理位置

选择喜欢的云提供商（如 AWS、Google Cloud、Azure）以及适合应用程序的地理位置，我选的是香港。
![](./assets/2.png)

其他的配置都可以默认

### 4. 配置账号密码

设置你连接数据库的账号密码，这个账号密码是用来我们之后代码中连接数据库用的。
![](./assets/3.png)

### 4. 配置 IP

这里要设置白名单，只有白名单下面的 ip 才能访问这个数据库，算是安全的一种操作。点击 Add My Current Ip Address 添加当前的 ip，也可以设置 0.0.0.0/0 代码开放所有的 ip。
![](./assets/4.png)

### Nodejs 连接

创建成功后，点击 CONNECT 连接
![](./assets/5.png)
点击 Drivers 查看 node.js 的代码
![](./assets/5-1.png)

选择 Version 之后，下面会生成对应的连接代码
![](./assets/7.png)
我这里用 5.5 的版本，会报下面这个错误，大家如果遇到可以将 version 换成 2.2.12
![](./assets/8.png)

这是我连接数据库的完整代码，uri 要换成自己的连接。

```js
const mongoose = require('mongoose');

var uri =
  'mongodb://admin:admin@ac-s5tf5m6-shard-00-00.b8p3ya0.mongodb.net:27017,ac-s5tf5m6-shard-00-01.b8p3ya0.mongodb.net:27017,ac-s5tf5m6-shard-00-02.b8p3ya0.mongodb.net:27017/?ssl=true&replicaSet=atlas-lcywbk-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(uri);
const conn = mongoose.connection;
conn.on('open', () => {
  console.log('ok');
});
conn.on('error', (err) => {
  console.log(err);
});
module.exports = mongoose;
```
