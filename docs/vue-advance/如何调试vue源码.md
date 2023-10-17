# 如何调试vue源码

# 代码打包

下载源码 

```bash
git clone https://github.com/vuejs/core.git
```

安装依赖

```bash
pnpm install
```

打包

```bash
pnpm build
```

在他的 `packages/vue` 文件夹下，将会生成 `dist` 文件夹。这个文件夹是我们用来调试代码的地方。

![Untitled](%E5%A6%82%E4%BD%95%E8%B0%83%E8%AF%95vue%E6%BA%90%E7%A0%81%209e2ce998efb246d8ad0471d51ceb7aed/Untitled.png)

# 调试case

在路径`packages/vue/examples`下创建一个名为`test`的新文件夹。在该文件夹中创建`index.html`文件。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="../../dist/vue.global.js"></script>
</head>

<body>
  <div id="app"></div>
  <script>
    const { reactive } = Vue
    const obj = reactive({ name: 'sanmu' })
  </script>
</body>

</html>
```

现在，我们可以在 `dist/vue.global.js` 下打断点了。

![Untitled](%E5%A6%82%E4%BD%95%E8%B0%83%E8%AF%95vue%E6%BA%90%E7%A0%81%209e2ce998efb246d8ad0471d51ceb7aed/Untitled%201.png)

# 开启SOURCE_MAP

虽然上面的代码有断点，但是它的代码量很大，很难调试和查找。因此，我们需要将源文件和vue.global.js的代码映射起来，以便更好地进行调试工作。为此，我们需要开启source_map。

我们打开`package.json`文件，找到`scripts`下的build命令。

```bash
"build": "node scripts/build.js",
```

从这里我们可以知道，`build`命令实际上执行的是scripts文件夹下的build.js文件。

在这个文件中，我们可以找到以下代码：当`sourceMap`为`true`时，执行参数`SOURCE_MAP:true`。

![Untitled](%E5%A6%82%E4%BD%95%E8%B0%83%E8%AF%95vue%E6%BA%90%E7%A0%81%209e2ce998efb246d8ad0471d51ceb7aed/Untitled%202.png)

接着，我们去找 `sourceMap` 是怎么创建的

![Untitled](%E5%A6%82%E4%BD%95%E8%B0%83%E8%AF%95vue%E6%BA%90%E7%A0%81%209e2ce998efb246d8ad0471d51ceb7aed/Untitled%203.png)

我们可以看到，`sourceMap`的值取决于`args.sourcemap`，而`args`又取决于`minimist`。

### minimist是什么？

`minimist`是一个类库，用于获取Node命令后面的参数。请查看官方网站的示例。

```bash
$ node example/parse.js -a beep -b boop
{ _: [], a: 'beep', b: 'boop' }
```

从它的官网案例可以知晓，它是将执行命令的参数转换成对象。

因此，我们只要设置`-s` 这个参数，就可以让 `sourceMap = args.sourceMap || args.s` 为 `true` 了。

### 修改方案

因此我们需要将`package.json`的命令修改如下

```bash
"build": "node scripts/build.js -s",
```

执行 `pnpm build` 后，将会生成 map 文件。

![Untitled](%E5%A6%82%E4%BD%95%E8%B0%83%E8%AF%95vue%E6%BA%90%E7%A0%81%209e2ce998efb246d8ad0471d51ceb7aed/Untitled%204.png)

在查看我们的调试时，就进入了 `reactive.ts` 文件。

![Untitled](%E5%A6%82%E4%BD%95%E8%B0%83%E8%AF%95vue%E6%BA%90%E7%A0%81%209e2ce998efb246d8ad0471d51ceb7aed/Untitled%205.png)