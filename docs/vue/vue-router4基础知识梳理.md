# vue-router4基础知识梳理

# 一、安装

```bash
# 安装项目
npm init vite@latest
✔ Project name: … vue-router-study
✔ Select a framework: › Vue
✔ Select a variant: › TypeScript
# 进入目录
cd vue-router-study
# 安装依赖
npm install
# 安装router
npm i vue-router
```

# 二、基础案例

### 1、创建路由实例

首先我们在 `src` 下创建 `router` 文件夹，在其中创建 `index.ts` 用于初始化我们 `Router` 实例。

通过 `vue-router` 的 `createRouter` 方法创建一个 `router` 对象。其中，参数传递 `history` 和 `routes`，`history` 表示路由器使用的历史记录模式，`routes` 是我们自己定义的路由和组件的映射关系。

```jsx
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
// 定义路由组件路径
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import(`../components/login.vue`),
  },
  {
    path: '/registry',
    component: () => import(`../components/registry.vue`),
  },
];
// 创建Router对象
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// 导出对象
export default router;
```

### 2、使用路由实例

打开 main.ts 文件，在 Vue 的插件中使用 use 添加我们的路由器。

```jsx
import router from './router';

createApp(App).use(router).mount('#app');
```

### 3、增加vue页面文件

我们新增两个页面，分别是login.vue和registry.vue页面组件

```jsx
// Login.vue
<template>
  <div class="login">login</div>
</template>
```

```jsx
// registry
<template>
  <div class="registry">registry</div>
</template>
```

### 4、通过路由实例串联页面组件

在`router/index.ts`文件中，我们定义了一个`routes`对象，其中记录了path和`component`。然后，在`App.vue`文件中，我们可以通过`router-view`将我们的路由地址和组件映射起来。

接下来，我们可以使用`router-link`来进行页面的跳转。它有一个`to`属性，能够让我们跳转到对应的`path`，从而展示该path下面的`component`。

```jsx
<script setup lang="ts"></script>

<template>
  <div>
    <router-link to="/login">login</router-link>
    <router-link to="/registry">reg</router-link>
  </div>
  <router-view></router-view>
</template>

<style scoped></style>
```

通过上述代码，最终的页面展示如下（由于篇幅原因，CSS部分已隐藏）。

访问页面url：[`http://localhost:5173/#/login`](http://localhost:5173/#/login)，即可看到。

![Untitled](vue3-router4%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E6%A2%B3%E7%90%86%204e5475c7d2a74e99ab6f99378b96bc06/Untitled.png)

页面中的`Login`和`Registry`都是可以点击的。当我们点击`Registry`之后，会跳转到`[http://localhost:5173/#/registry](http://localhost:5173/#/registry)`。

![Untitled](vue3-router4%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E6%A2%B3%E7%90%86%204e5475c7d2a74e99ab6f99378b96bc06/Untitled%201.png)

通过上面的例子，我们完整演示了如何引入vue路由以及如何使用它。

# 三、核心概念介绍

## 1、history模式

### createWebHashHistory

在我们使用`createRouter`创建`router`对象的时候，将`history=createWebHashHistory()`。

之后我们访问页面的地址便是这个样子 `[http://localhost:5173/#/login](http://localhost:5173/#/login)` 和 `http://localhost:5173/#/registry` 后面的路由都带有 `#/`，这就是我们常说的哈希。在浏览器控制台中输入 `location.hash`，可以得到以下结果：

```jsx
location.hash
'#/login'
```

当我们输入`location.hash = '/registry'`,就可以跳转到 `[http://localhost:5173/#/registry](http://localhost:5173/#/registry)`

当我们跳转到某个页面后，可以通过浏览器的返回按钮回到之前的页面

![Untitled](vue3-router4%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E6%A2%B3%E7%90%86%204e5475c7d2a74e99ab6f99378b96bc06/Untitled%202.png)

这里的操作，触发了 `hashchange`事件，我们在控制台给window创建该事件

```jsx
window.addEventListener('hashchange',(e) => {console.log(e)})
```

点击返回按钮，则会获得如下内容

![Untitled](vue3-router4%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E6%A2%B3%E7%90%86%204e5475c7d2a74e99ab6f99378b96bc06/Untitled%203.png)

### createWebHistory

我们将 `history: createWebHistory()`，在访问我们的两个页面路由地址就变成如下的样子[`http://localhost:5173/login`](http://localhost:5173/login)和[`http://localhost:5173/registry`](http://localhost:5173/registry)。没有上面模式的`#/`

了。

它实际上使用的浏览器的`histroy`关键字

![Untitled](vue3-router4%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E6%A2%B3%E7%90%86%204e5475c7d2a74e99ab6f99378b96bc06/Untitled%204.png)

对于返回上一页的状态记录，它通过 popstate 监听。我们可以在控制台输入以下代码来实现：

```jsx
window.addEventListener('popstate',(e)=> {console.log(e)})
```

在点击返回按钮，则会触发如下内容

![Untitled](vue3-router4%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E6%A2%B3%E7%90%86%204e5475c7d2a74e99ab6f99378b96bc06/Untitled%205.png)

如果想手动跳转到某个页面，通过`pushState`方法。我们在控制台输入如下代码

```jsx
history.pushState({ state: 1},'','registry')
```

然后就可以跳转到 [`http://localhost:5173/registry`](http://localhost:5173/registry)

## 2、路由命名

在一开始我们通过`path`记录路径，实际上我们可以通过`name`属性来写。我们将`routes`变量增加`name`属性 

```jsx
const routes: RouteRecordRaw[] = [
  {
    name: 'login',
    component: () => import(`../components/login.vue`),
  },
  {
    name: 'registry',
    component: () => import(`../components/registry.vue`),
  },
];
```

然后修改我的`App.vue`下面的`router-link`的跳转参数

```jsx
<router-link :to="{ name: 'login' }">Login</router-link>
<router-link :to="{ name: 'registry' }">Registry</router-link>
```

## 3、通过js方法跳转

除此之外，我们还可以通过`js`的方法操作来实现路由的跳转，添加两个`button`，每个`button`绑定`toLink`事件，之后在通过`userRouter`来获取`router`，在通过`router.push`跳转

```html
<template>
<button @click="toLink('/login')">login</button>
<button @click="toLink('/registry')">registry</button>
<router-view></router-view>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const toLink = (path: string) => {
  router.push(path);
};
</script>
```

如果想通过name进行跳转的话，需要将传递的路径参数改成名称

```html
<template>
<button @click="toLink('login')">login</button>
<button @click="toLink('registry')">registry</button>
<router-view></router-view>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const toLink = (path: string) => {
  router.push({ name: path });
};
</script>

```

## 4、路由传参数

### query

我们增加一个`button`按钮用于从`login`页面跳转到`registry`，然后在跳转的同时，我们增加query参数将name和password写入

```jsx
<template>
<button @click="toLink('registry')">to registry</button>
<router-view></router-view>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const toLink = (path: string) => {
  router.push({
		name: path,
		query: {name: 'sanmu', password:'123456'}
	})
};
</script>
```

![Untitled](vue3-router4%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E6%A2%B3%E7%90%86%204e5475c7d2a74e99ab6f99378b96bc06/Untitled%206.png)

接下来，我们需要通过 `useRoute` 到 `registry` 页面获取。

```jsx
<template>
  <div class="registry">我是Registry页面</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
console.log(route.query);
</script>
```

当我们点击`button`之后，可以看到我们的`url`和控制台都有对应的参数了

![Untitled](vue3-router4%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E6%A2%B3%E7%90%86%204e5475c7d2a74e99ab6f99378b96bc06/Untitled%207.png)

### params

在使用params之前，我们需要修改下router的path的值，修改样子如下

```tsx
const routes: RouteRecordRaw[] = [
	...
  {
    path: '/registry/:name',
  },
];
```

然后我们将参数的传递方式变为params

```jsx
const toLink = (path: string) => {
  router.push({
		name: path,
		params: {name: 'sanmu'}
	})
};
```

这样当我们点击按钮之后，显示的结果如下。

![Untitled](vue3-router4%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E6%A2%B3%E7%90%86%204e5475c7d2a74e99ab6f99378b96bc06/Untitled%208.png)

这里要注意：

1. `push`里面不可以用`path`，需要换成`name`，详情看官网[https://router.vuejs.org/zh/guide/essentials/navigation.html](https://router.vuejs.org/zh/guide/essentials/navigation.html)
2. `routes`变量里面的`path`，一定要换成`/xxx/:yyy`，后面的`yyy`就是你params中要传递的参数

上面两点没注意的话，跳转之后的页面`params`都无法获取到

## 5、嵌套路由

例如，常见的一种场景是，左侧是导航栏，右侧是内容区域。每次点击左侧的导航栏，右侧内容会发生变化，但此时页面并不会重新加载，左侧的导航栏也不进行重新加载。

在这种情况下，右侧内容区域的`URL`就是嵌套在左侧导航栏所属页面的`URL`下。

![Untitled](vue3-router4%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E6%A2%B3%E7%90%86%204e5475c7d2a74e99ab6f99378b96bc06/Untitled%209.png)

修改我们的`routes`对象，然后增加，增加一个`home`的导航，并且之前的`login`和`registry`都是`children`属性下的值，同时我们将`path`的`/`去掉

```jsx
const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/nav.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(`../components/login.vue`),
      },
      {
        path: 'registry',
        name: 'registry',
        component: () => import(`../components/registry.vue`),
      },
    ],
  },
];
```

然后添加一个nav.vue，这里也需要增加一个`router-view`标签

```jsx
<template>
  <div>我是导航栏</div>
  <hr />
  <router-link to="/home/login">login</router-link>
  <router-link to="/home/registry">registry</router-link>
  <hr />
  <router-view></router-view>
</template>
```

我们访问[`http://localhost:5173/home`](http://localhost:5173/home)，可以单独显示nav组件的内容

![Untitled](vue3-router4%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E6%A2%B3%E7%90%86%204e5475c7d2a74e99ab6f99378b96bc06/Untitled%2010.png)

然后在点击`login`和`registry`的button，就可以跳转到对应的内容了

![Untitled](vue3-router4%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E6%A2%B3%E7%90%86%204e5475c7d2a74e99ab6f99378b96bc06/Untitled%2011.png)

![Untitled](vue3-router4%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E6%A2%B3%E7%90%86%204e5475c7d2a74e99ab6f99378b96bc06/Untitled%2012.png)

还记得我们前面讲`routes`下面的`path:'/login'`换成了`path:'login'`。只有这样，我们才能将`login`和`registry`放到如图所示的`home`之后。

直接访问`/login`，显示的白板，因为找不到

![Untitled](vue3-router4%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E6%A2%B3%E7%90%86%204e5475c7d2a74e99ab6f99378b96bc06/Untitled%2013.png)

现在我们将path改回来

```jsx
{
  path: '/login',
  name: 'login',
  component: () => import(`../components/login.vue`),
},
```

我们通过[`http://localhost:5173/login`](http://localhost:5173/login)

![Untitled](vue3-router4%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E6%A2%B3%E7%90%86%204e5475c7d2a74e99ab6f99378b96bc06/Untitled%2014.png)

**结论，`path`没有`/`，相当于是基于父路由的相对路由，如果加上了`/`那么就是自己绝对路由，不受父路由控制了。**

## 6.路由重定向-redirect

路由重定向是指当用户访问某个路由时，自动跳转到另一个路由。例如，我们可以将访问 `/` 重定向到 `/home`，或者将访问 `/users` 重定向到 `/users/1`。

我们可以在 `routes` 数组中使用 `redirect` 字段来进行路由重定向。例如，我们将 `/` 重定向到 `/home`：

```
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
]

```

上面的代码中，当用户访问 `/` 时，自动跳转到 `/home`。

我们还可以在路由配置中使用 `alias` 字段来为路由添加别名。例如，我们将 `/about` 添加别名 `/company`：

```
const routes = [
  {
    path: '/about',
    component: About,
    alias: '/company',
  },
]

```

上面的代码中，访问 `/about` 和 `/company` 都会渲染 `About` 组件。

## 7、路由元信息

路由元信息可以用来存储一些与路由相关的可扩展信息。例如，我们可以在路由配置中添加 `meta` 字段来存储一些额外的信息。例如，我们可以在 `/home` 路由中添加一个 `title` 字段来存储页面标题：

```jsx
const routes = [
  {
    path: '/home',
    component: Home,
    meta: {
      title: 'Home Page',
    },
  },
]
```

上面的代码中，我们在 `/home` 路由中添加了一个 `meta` 字段，其中包含一个 `title` 字段，用来存储页面标题。我们可以在路由跳转时，读取这个 `meta` 字段，然后设置页面标题，如下所示：

```jsx
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
```

上面的代码中，我们在 `beforeEach` 钩子函数中，读取了路由的 `meta` 字段，并将其设置为页面标题。

简单来说，meta在路由里面存放一些属性值，用于在打开新的URL页面时可以进行一些赋值或判断。

其使用场景以及上面代码的`beforeEach`将在下一篇导航守卫详细讲解。

## 8、过渡效果

我们可以在路由的`<router-view>`标签上添加过渡效果，使页面跳转时更加平滑。首先，在`<template>`标签中，给`<router-view>`标签添加`v-slot`属性，并指定过渡效果的名称，例如：

```
<router-view v-slot="{ Component }">
  <transition name="fade" mode="out-in">
    <component :is="Component" />
  </transition>
</router-view>

```

在上面的代码中，我们使用了`v-slot`指令来获取当前路由对应的组件，并使用`<transition>`标签包裹组件，指定了过渡效果的名称为`fade`，模式为`out-in`。接着，我们可以在样式文件中定义`fade`过渡效果，例如：

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

```

在上面的代码中，我们使用`transition`属性来定义过渡效果，指定了过渡属性为`opacity`，过渡时间为`0.5s`。同时，我们定义了`.fade-enter`和`.fade-leave-to`两个类，用于在进入和离开过渡时设置元素的初始和结束状态。在这个例子中，我们将元素的不透明度设置为`0`，以实现淡入淡出的效果。

加入这些代码后，我们就可以在页面跳转时看到平滑的过渡效果了。

在测试中，发现一个问题，子级的组件template中必须有一个跟元素

```html
// 不生效
<template>
	<div></div>
	<div></div>
</template>
// 生效
<template>
	<div>
		<div></div>
		<div></div>
	</div>
</template>
```

## 9、滚动行为

我们可以在路由配置中使用 `scrollBehavior` 字段来自定义路由跳转时的滚动行为。例如，我们可以将滚动行为修改为始终滚动到页面顶部：

```
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

```

上面的代码中，我们在创建路由时，使用 `scrollBehavior` 字段来自定义滚动行为，其中返回 `{ top: 0 }` 表示始终滚动到页面顶部。

除了始终滚动到页面顶部，我们还可以根据目标路由的路径、哈希值、查询参数等信息，自定义滚动行为。例如，我们可以将滚动行为修改为跳转到包含指定哈希值的元素：

```jsx
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    } else {
      return { top: 0 }
    }
  },
})

```

上面的代码中，我们在 `scrollBehavior` 函数中，根据目标路由的哈希值，返回滚动行为。如果目标路由包含哈希值，则返回 `{ el: to.hash, behavior: 'smooth' }`，表示滚动到指定元素，并使用平滑滚动效果。否则，返回 `{ top: 0 }`，表示始终滚动到页面顶部。

在`savedPosition`中，可以记录位置，以便在浏览器的前进和后退操作之后返回到该位置。

```jsx
scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }else{
			return {top:0}
		}
},
```

# 参考文章

[https://router.vuejs.org/zh/guide/essentials/navigation.html](https://router.vuejs.org/zh/guide/essentials/navigation.html)

[https://www.bilibili.com/video/BV1oL411P7JX/?p=2&spm_id_from=pageDriver&vd_source=c19fd85626ac5ad9f4d7c1ef103bb781](https://www.bilibili.com/video/BV1oL411P7JX/?p=2&spm_id_from=pageDriver&vd_source=c19fd85626ac5ad9f4d7c1ef103bb781)