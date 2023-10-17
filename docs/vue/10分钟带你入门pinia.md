# pinia 基础语法

# 什么是 pinia

官网的解释：`Pinia` 是 `Vue` 的专属状态管理库，它允许您跨组件或页面共享状态。

实际上，`Pinia` 是 `Vuex` 的升级版，但为了尊重原作者，它被命名为 `Pinia`。因此，您可以简单地将其视为起到 `Vuex` 的作用。

# 为什么用 pinia

![Pasted image 20230411160336.png](10%E5%88%86%E9%92%9F%E5%B8%A6%E4%BD%A0%E5%85%A5%E9%97%A8pinia%2008f97e2103f9435d8dd819f065f99987/Pasted_image_20230411160336.png)

上图展示了`Vue`的组件结构，其中`Root`是根组件，下面连接的是其子组件和子孙组件。

对于组件 A，它有一个变量`count`和一个可以改变`count`值的函数。当执行`setCount(20)`时，`count`的值就会变成 20。

现在有一个需求，即组件 B 和组件 C 也希望展示`count`的值，该怎么做呢？

![Pasted image 20230411163650.png](10%E5%88%86%E9%92%9F%E5%B8%A6%E4%BD%A0%E5%85%A5%E9%97%A8pinia%2008f97e2103f9435d8dd819f065f99987/Pasted_image_20230411163650.png)

一种方案是在根组件中创建 `count` 和 `setCount`，然后将它们作为参数传递给组件 A 以展示和修改，将 `count` 值传递给组件 B 和 C 以展示。

上述方案明显过于繁琐，通过中间参数传递值会使得代码冗余且容易出错。一旦某个组件展示不正确，则需要层层调试。

![Pasted image 20230411164319.png](10%E5%88%86%E9%92%9F%E5%B8%A6%E4%BD%A0%E5%85%A5%E9%97%A8pinia%2008f97e2103f9435d8dd819f065f99987/Pasted_image_20230411164319.png)

看看新的方案，我在组件之外单独维护一个 store 的状态块，里面记录了 `count` 的值以及能够操作 `count` 变化的 `setCount` 方法。然后将它下发到我需要使用的各个组件。对于组件 A，传递 `count` 和 `setCount`；对于组件 B 和 C，传递 count 用于显示。

这样做的优势有：

- 将数据和组件解耦。组件里的业务需要展示数据时，从 `store` 中获取；需要修改数据时，触发 `store` 的方法。
- 将数据集中在一个地方，方便管理。一旦发现某个数据有误，可以很快地找到文件。

除了 `Pinia` 之外，其他状态管理库也有类似的优势：

- `Devtools` 支持
  - 追踪 `actions`、`mutations` 的时间线
  - 在组件中展示它们所用到的 `Store`
  - 让调试更容易的 `Time travel`
- 热更新
  - 不必重载页面即可修改 `Store`
  - 开发时可保持当前的 `State`
- 插件：可通过插件扩展 `Pinia` 功能
- 为 `JS` 开发者提供适当的 `TypeScript` 支持以及自动补全功能。
- 支持服务器端渲染。

# pinia 的使用

## 1、 初始化项目

执行 `npm init vue@latest` 命令，安装 `Vue3` 项目。之后输入以下内容：

```bash
✔ Project name: … pinia-learn
✔ Add TypeScript? … No
✔ Add JSX Support? … No
✔ Add Vue Router for Single Page Application development? … Yes
✔ Add Pinia for state management? … Yes
✔ Add Vitest for Unit Testing? … No
✔ Add an End-to-End Testing Solution? › No
? Add ESLint for code quality? › No
```

根据以下命令，安装完成后进入 `pinia-learn` 目录，执行 `npm install` 安装依赖，然后执行 `npm run dev`。在浏览器中访问 [`http://localhost](http://localhost/):**5174**/` 打开页面。

![Untitled](10%E5%88%86%E9%92%9F%E5%B8%A6%E4%BD%A0%E5%85%A5%E9%97%A8pinia%2008f97e2103f9435d8dd819f065f99987/Untitled.png)

## 2、安装 pinia

```bash
yarn add pinia
npm install pinia
```

## 3、引入 pinia

首先，通过 `npm init vue@latest` 安装一个基础的 Vue 项目。然后，按照以下方式修改 `main.js` 文件，引入 `pinia` 并使用 `createApp` 创建应用程序：

```jsx
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);
app.use(createPinia());
app.mount('#app');
```

## 4、创建 store

创建名为`stores`的文件夹，然后在其中创建名为`counter.js`的文件。

```jsx
import { defineStore } from 'pinia';

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    count: 0,
  }),
  actions: {
    increaseCount() {
      this.count++;
    },
    decreaseCount() {
      this.count--;
    },
  },
  getters: {
    doubleCount: (state) => state.count * 2,
  },
});
```

创建 store 的逻辑非常简单，只需调用 defineStore 创建一个 useCounterStore 并导出即可。defineStore 方法接受以下参数：

- id：唯一标识，必须传入。`Pinia` 将使用它连接 `store` 和 `devtools`。
- state：存储 `store` 的数据（data）。
- actions：定义了一些方法（methods），通过 `actions` 可以让我们修改 state 的值。
- getters：`store` 的计算属性（computed），可以获取基于 `state` 生成的一些值。

## 5、使用 store

### App.vue

引入两个页面，分别展示主页和关于页面。

```jsx
<template>
	<div class="app">
		<nav>
		<RouterLink to="/">操作页</RouterLink> |
		<RouterLink to="/about">展示</RouterLink>
		</nav>
		<RouterView />
	</div>
</template>
<style>
	.app {
		text-align: center;
	}
</style>
```

### HomeView.vue

1. 从 `stores/counter` 中引入 `useCounterStore`，创建 `storeCounter` 变量。
2. 从 `storeCounter` 获取 `count` 并在页面上显示。
3. 创建两个按钮，加号按钮绑定 `increaseCount` 方法，减号按钮绑定 `decreaseCount` 方法。

上述变量在我们创建 store 时都可以找到，大家可以对应查看。

```jsx
<template>
  <div class="home">
    <div class="count">{{ storeCounter.count }}</div>
  </div>
  <div class="buttons">
    <button @click="storeCounter.decreaseCount">-</button>
    <button @click="storeCounter.increaseCount">+</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCounterStore } from '@/stores/counter';

const storeCounter = useCounterStore();
</script>

<style>
.count {
  font-size: 60px;
  margin: 0;
}
.buttons button {
  font-size: 40px;
  margin: 10px;
}
</style>
```

之后我们可以看到如下的页面。当点击加号或减号时，上面的`count`会发生相应的变化。

![Untitled](10%E5%88%86%E9%92%9F%E5%B8%A6%E4%BD%A0%E5%85%A5%E9%97%A8pinia%2008f97e2103f9435d8dd819f065f99987/Untitled%201.png)

### AboutView.vue

在这个页面，我们主要测试在`HomeView`组件下改变的 count 是否可以同步变化。

我们引入`storeCount`，并显示它的属性`count`。然后操作`HomeView`的按钮，切换到展示页面查看数据。

同时，我们给展示的按钮绑定了`increaseCount`事件。操作之后，回到操作页面，数值也会同步变化。

```jsx
<template>
  <div class="about">
    <button @click="storeCounter.increaseCount">
      {{ storeCounter.count }}
    </button>
  </div>
</template>

<script setup>
import { useCounterStore } from '../stores/counter';

const storeCounter = useCounterStore();
</script>

<style>
button {
  font-size: 50px;
  margin: 10px;
}
</style>
```

![Untitled](10%E5%88%86%E9%92%9F%E5%B8%A6%E4%BD%A0%E5%85%A5%E9%97%A8pinia%2008f97e2103f9435d8dd819f065f99987/Untitled%202.png)

# 总结

相对来说，`Pinia` 的使用方法较少。简单来说，可以将其理解为创建了一个文件和变量，其中包含了需要的变量和方法。然后将这些值导出，在需要使用的组件中引入即可。

**参考资料**

[https://zhuanlan.zhihu.com/p/533233367](https://zhuanlan.zhihu.com/p/533233367)

[https://pinia.vuejs.org/zh/core-concepts/](https://pinia.vuejs.org/zh/core-concepts/)

本文主要介绍了 `Pinia` 状态管理库的使用方法和优势。首先，`Pinia` 可以让您跨组件或页面共享状态，是 `Vuex` 的升级版。其优点是将数据和组件解耦，方便管理，能够支持热更新、插件、服务器端渲染等特性。

接着，本文介绍了 `Pinia` 的使用方法。首先，通过 `npm init vue@latest` 命令创建一个基础的 Vue 项目，然后安装 `Pinia` 和相关依赖。接着，在主文件中引入 `Pinia`，并创建一个 `store`。最后，在需要使用 `store` 的地方引入即可。

本文还提供了代码示例，包括如何在 `App.vue`、`HomeView.vue` 和 `AboutView.vue` 中使用 `Pinia`，以及如何创建和使用 `store`。

总的来说，使用 `Pinia` 可以方便地管理和共享状态，减少代码冗余和出错的可能性，适用于需要多个组件访问同一数据的场景。
