# Monorepo是什么，从0到1带你配置

# 什么是****Monorepo****

**`Monorepo`** 全称 `monolithic repository`（单个仓库）**，**是指将所有相关代码组织在一个单一的存储库中的开发模式。

如下图所示，左侧我们把不同功能的项目放到了多个仓库中，这就是`Multirepo`。将其聚合在一个仓库中即为`Monorepo`。

![Untitled](Monorepo%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%8C%E4%BB%8E0%E5%88%B01%E5%B8%A6%E4%BD%A0%E9%85%8D%E7%BD%AE%20a2f6d87d850042d49441b99cc1d76ad1/Untitled.png)

# 为什么使用Monorepo

很多同学可能会好奇，为什么要将这些不同功能的仓库放在一起呢？

我们先来梳理一下。当我们本地开发不同仓库的代码时，如果B仓库的某个功能需要以A仓库的代码组件为基础，我们该如何使用呢？

举个通俗的例子。

比如你写业务项目需要用到`ElementUI`，写`React`项目需要用到`Antd`。我们通常在业务仓库`install`组件库之后，再`import`进来使用。这种开发前提是你使用的功能都是ElementUI和Antd已经有的。

但是，假如某个需求迭代是基于`Antd`，但是还没有开发出来，你该怎么办呢？

方法1：开发`Antd`组件，将其发布到`npm`库中。然后在编写业务组件时，更新Antd的版本并将其下载安装。

方式2：通过`npm link`将你的业务仓库和组件库进行链接。

无论是方式1还是方式2，一旦你在开发过程中发现组件库有`bug`需要重新修改，都需要耗费不少时间。

哪怕是使用link模式，如果我同时业务组件依赖`Utils`，`Apis`，`UiComponent`三个库，要进行三次`link`。

`Menorepo`恰恰可以解决上面的问题。

他的优点如下：

1. 代码复用变得很容易，因为所有的项目代码都在一个仓库，我们很容易通过工具将其在各个代码文件中引用
2. 依赖变得简单
3. 发布npm包简单，我们可以基于不同项目的代码，能够再次提取公共部分，快速发到npm库上
4. 避免重复安装包，减少磁盘空间，降低构建时间

# 基于pnpm创建一个monorepo仓库

## 仓库分析

三个项目`h5-vue`，`web-vue`，`utils`。

`h5-vue`对应着我们h5的项目，`web-vue`对应着我们web项目，`utils`是是这两`vue`项目都会用到的一些工具方法。

如果不将`utils`进行抽离的话，我们需要在`h5-vue`和`web-vue`都要写一遍，如果后期要改的话，也要改两次，成本很大。

所以，将`utils`抽离成`npm`库，并且和我们的两个`vue`项目组成`menorepo`很适合。

![Untitled](Monorepo%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%8C%E4%BB%8E0%E5%88%B01%E5%B8%A6%E4%BD%A0%E9%85%8D%E7%BD%AE%20a2f6d87d850042d49441b99cc1d76ad1/Untitled%201.png)

## 安装pnpm

```bash

npm install -g pnpm
```

## 仓库初始化

通过一下命令创建一个项目

```bash
# 创建项目目录
mkdir pnpm-monorepo
# 进入项目目录
cd pnpm-monorepo
```

之后我们在初始化`package.json`文件

```bash
pnpm init 
```

在目录下，我们生成了一个`package.json`文件。在其中增加`privete:true`，表示该根目录不会发布到npm库。

```json
{
  "name": "pnpm-monorepo",
  "version": "1.0.0",
  "private": true,
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

接着我们需要创建workspace，用于定义各个仓库的工作区间，创建`pnpm-workspace.yaml`，内容如下。

```bash
packages:
# packages的子目录
  - 'packages/*'
# utils下的所有目录
  - 'utils/**'
```

## 创建项目

### 创建vue项目

创建packages目录，进入到packages目录，创建vue项目

```bash
pnpm create vue@latest
```

一个项目，名称叫h5-vue，另一个叫web-vue，剩下的内容全部选no，即可得到如下

![Untitled](Monorepo%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%8C%E4%BB%8E0%E5%88%B01%E5%B8%A6%E4%BD%A0%E9%85%8D%E7%BD%AE%20a2f6d87d850042d49441b99cc1d76ad1/Untitled%202.png)

### 创建utils项目

因为utils定义为一个工具函数仓库，所以我们用vite创建。**进入到根目录，执行以下命令**

```bash
pnpm create vite
```

名称为uitls，然后分别选择vue，JavaScript

![Untitled](Monorepo%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%8C%E4%BB%8E0%E5%88%B01%E5%B8%A6%E4%BD%A0%E9%85%8D%E7%BD%AE%20a2f6d87d850042d49441b99cc1d76ad1/Untitled%203.png)

进入到`h5-vue/web-vue`。执行`pnpm install`安装依赖。

## 增加测试代码

## utils

进入到`utils/src`创建一个`index.js`文件，创建`sum`函数

```jsx
export const sum = (a,b) => {
  return a+b
}
```

需要将函数export，所以我们进入到utils目录下的package.json，增加修改如下代码

```jsx
{
  ...
  "name": "@sanmu/utils",
  "main": "./src/index.js",
  ...
}
```

main的含义是，该项目的入口文件路径是`"./src/index.js"`

在名称前面增加`@sanmu`的限制，是因为`utils`这个名称太常见了，很容易发生重名的情况，因此我们需要进行限制。

这种写法在一些常见的库中也很常见，例如`@babel/core`、`@babel/cli`、`@babel/parser`。

### h5-vue/web-vue

进入到我们的业务代码目录，然后执行

```jsx
pnpm add @sanmu/utils
```

在打开我们的h5/-vue下面的package.json，就可以发现多了一段

```jsx
"@sanmu/utils": "workspace:^0.0.0",
```

![Untitled](Monorepo%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%8C%E4%BB%8E0%E5%88%B01%E5%B8%A6%E4%BD%A0%E9%85%8D%E7%BD%AE%20a2f6d87d850042d49441b99cc1d76ad1/Untitled%204.png)

> 因为这个`workspace`这个关键字，pnpm`在`就会从你配置的`workspace`里查找，而不是从`npm`仓库。
> 

在`h5-vue`中，我们执行`pnpm dev`将项目启动，然后访问[`http://localhost:5173/`](http://localhost:5173/)

接着在`App.vue`修改代码如下，将默认的代码都删除，然后引入我们utils下面的sum函数

```html
<script setup>
import { sum } from '@sanmu/utils';
const ans = sum(1, 2);
</script>

<template>1 + 1的结果是{{ ans }}</template>
```

页面的结果如下，也代表着我们的`sum`方法引入成功

![Untitled](Monorepo%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%8C%E4%BB%8E0%E5%88%B01%E5%B8%A6%E4%BD%A0%E9%85%8D%E7%BD%AE%20a2f6d87d850042d49441b99cc1d76ad1/Untitled%205.png)

在`web-vue`项目下，将上面的步骤重新操作一遍

## 安装依赖

我们依赖分为两种：

1. 公共的依赖，仓库中的大部分都需要使用的依赖，比如babel，ts，lodash等
2. 只属于某个项目中使用的依赖，比如拖拽的组件库

### 公共依赖

对于第一个，我们可以通过`-w, --workspace-root` 参数，可以将依赖包安装到工程的根目录下，作为所有 package 的公共依赖。

```html
pnpm install typescript -w
```

### 某个package的依赖

通过 `--filter`来限制

```html
pnpm add axios --filter '@sanmu/h5-vue'
```

## 打包

在每个项目中的`package.json`的`scripts`命令下配置好build命令

然后，我们在根目录的package.json配置

```bash
"build": "pnpm -r exec pnpm build",
```

`pnpm exe`c 表示在项目内执行`shell`命令，`-r`代表代表工作区的每个项目中执行，执行的`pnpm build`就是执行我们在各个项目中`scripts`下的命令

pnpm是默认按照拓扑排序的，

![Untitled](Monorepo%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%8C%E4%BB%8E0%E5%88%B01%E5%B8%A6%E4%BD%A0%E9%85%8D%E7%BD%AE%20a2f6d87d850042d49441b99cc1d76ad1/Untitled%206.png)

我们的项目vue项目依赖utils项目，所以打包也应该是utils先打包，然后在打包vue项目，然后更新vue的版本

![Untitled](Monorepo%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%8C%E4%BB%8E0%E5%88%B01%E5%B8%A6%E4%BD%A0%E9%85%8D%E7%BD%AE%20a2f6d87d850042d49441b99cc1d76ad1/Untitled%207.png)

可以看到这里的打包顺序确实如此。

对于每次发布之前的版本号的更新，也不需要手动去处理，可以用 `changeset`。

总之，通过pnpm可以很简单的配置出monorepo的仓库，更多的是对于pnpm命令的熟悉。

除此之外还可以通过yarn workspace+learn实现，思想都差不多，无非就是命令和配置不同。

# 参考文章

[https://qwqaq.com/2021/08/what-is-monorepo/](https://qwqaq.com/2021/08/what-is-monorepo/)

[https://juejin.cn/post/7081440800143310884](https://juejin.cn/post/7081440800143310884)

[https://juejin.cn/post/7220681627977318458](https://juejin.cn/post/7220681627977318458)

[https://juejin.cn/post/7098609682519949325](https://juejin.cn/post/7098609682519949325)