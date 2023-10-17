# npm run xxx 到底做了什么事情

几乎每一个前端项目都一个`package.json`文件，这个文件里面总是能看到一个关键字 `scripts`

```json
{
  ...,
	"scripts": {
	  "webpack": "webpack --config webpack.config.js",
	  "postinstall": "node ./scripts/postinstall.js"
	},
  ...,
}
```

我们可以通过 `npm run xxx` 来执行 `scripts` 中的命令。例如，当我们执行 `npm run webpack` 时，实际上是在执行 `scripts` 中的 `webpack` 命令，即 `webpack --config webpack.config.js`。

那么，为什么`webpack --config webpack.config.js` 会执行呢？

当我们获得一个新项目或者引入新的类库时，通常会执行`npm install`或`npm install xxx`命令。这会在`package.json`文件中的`devDependencies`中添加新的值。

例如，我们使用`npm install webpack webpack-cli -D`之后，`package.json`将会生成以下内容：

```json
"devDependencies": {
  "webpack": "^5.79.0",
  "webpack-cli": "^5.0.1"
}
```

此外，我们还可以看到`node_modules`下的.bin 文件夹中增加了`webpack`和`webpack-cli`两个文件。

![Untitled](%E6%89%A7%E8%A1%8C%E4%BA%86npm%20run%20xxx%E5%88%B0%E5%BA%95%E5%81%9A%E4%BA%86%E4%BB%80%E4%B9%88%E4%BA%8B%E6%83%85%20246b18cff5d740c99004a1efd0cab524/Untitled.png)

打开`webpack`文件，可以看到文件顶部写着`#!/usr/bin/env node`，表示这是一个通过使用`node`执行的脚本。

![Untitled](%E6%89%A7%E8%A1%8C%E4%BA%86npm%20run%20xxx%E5%88%B0%E5%BA%95%E5%81%9A%E4%BA%86%E4%BB%80%E4%B9%88%E4%BA%8B%E6%83%85%20246b18cff5d740c99004a1efd0cab524/Untitled%201.png)

那我再问，这个`.bin`下面的`webpack`文件怎么执行`npm install`就能安装了呢？总得有一个创建拷贝的过程吧。

你还记得我们之前说的吗？`npm install`之后，除了生成`.bin`下的文件，还有一个`webpack`的文件夹。我们打开它看一看。

![Untitled](%E6%89%A7%E8%A1%8C%E4%BA%86npm%20run%20xxx%E5%88%B0%E5%BA%95%E5%81%9A%E4%BA%86%E4%BB%80%E4%B9%88%E4%BA%8B%E6%83%85%20246b18cff5d740c99004a1efd0cab524/Untitled%202.png)

可以发现，在`webpack`文件夹下面也有一个 bin 文件。打开这个 webpack.js 文件，可以发现里面的代码和`node_modules`下面的`.bin/webpack`代码一样。我们可以猜测这两个文件是互相类似于拷贝的关系。

`npm` 把这个关系过程，叫做**软连接**

软连接如何生成的呢，打开 webpack 下面的 package.json，可以找到如下的代码

```json
"bin": {
  "webpack": "bin/webpack.js"
}
```

在执行`npm install`时，`npm`会读取这个配置，然后将其软链接到`./node_modules/.bin`目录下。npm 还会自动将`node_modules/.bin`添加到`$PATH`中，这样就可以直接作为命令运行依赖程序和开发依赖程序，而无需进行全局安装。

如果我们使用 `npm install -g xxx` 来安装安装包，其中的 `bin` 文件将被添加到全局路径中。例如 `webpack` 。在全局安装后，您可以直接使用 `webpack` 这样的命令来全局打包了。

现在我知道了，我执行`npm run xxx` 就是执行`node_module/.bin/xxx`，我执行`npm install`，就是把命令安装到`node_module/.bin`下

那为什么，我没有执行的某个`scripts`下面的命令，依旧会执行呢？

比如`package.json`

```json
{
  ...,
	"scripts": {
	  "webpack": "webpack --config webpack.config.js",
	  "postinstall": "node ./scripts/postinstall.js"
	},
  ...,
}
```

scripts/posinstall.js

```json
console.log('postinstall hello')
```

![Untitled](%E6%89%A7%E8%A1%8C%E4%BA%86npm%20run%20xxx%E5%88%B0%E5%BA%95%E5%81%9A%E4%BA%86%E4%BB%80%E4%B9%88%E4%BA%8B%E6%83%85%20246b18cff5d740c99004a1efd0cab524/Untitled%203.png)

# 参考文章

[https://juejin.cn/post/6844903957228158983](https://juejin.cn/post/6844903957228158983)

[https://juejin.cn/post/6971723285138505765](https://juejin.cn/post/6971723285138505765)

[https://juejin.cn/post/7078924628525056007](https://juejin.cn/post/7078924628525056007)
