# 启动-Node连接数据库

# 服务连接数据库

```jsx
const { Sequelize } = require('sequelize');

// 方法 1: 传递一个连接 URI
const sequelize = new Sequelize('sqlite::memory:') // Sqlite 示例
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Postgres 示例

// 方法 2: 分别传递参数 (sqlite)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite'
});

// 方法 3: 分别传递参数 (其它数据库)
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
});
```

- dialect 数据库类型
- storage 存储数据库文件地址
- logging 显示数据库日志

```jsx

logging: console.log,                  // 默认值,显示日志函数调用的第一个参数
logging: (...msg) => console.log(msg), // 显示所有日志函数调用参数
logging: false,                        // 禁用日志记录
logging: msg => logger.debug(msg),     // 使用自定义记录器(例如Winston 或 Bunyan),显示第一个参数
logging: logger.debug.bind(logger)     // 使用自定义记录器的另一种方法,显示所有消息
```

# 测试服务

使用`.authenticate()` 函数测试连接是否正常

```jsx
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
```

# 关闭连接

使用`sequelize.close()`，这是异步的并返回一个`Promise`