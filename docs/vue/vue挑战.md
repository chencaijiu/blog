# vue 挑战

## 热身

### 1、你好！

[https://cn-vuejs-challenges.netlify.app/questions/1-hello-word/README.zh-CN.html](https://cn-vuejs-challenges.netlify.app/questions/1-hello-word/README.zh-CN.html)

将 msg 增加模版括号

```html
<script setup>
  import { ref } from "vue";
  const msg = ref("Hello World");
</script>

<template>
  <div>
    <h1>{{msg}}</h1>
  </div>
</template>
```

## 简单

### 1、生命周期钩子

问题：修复切换子组件后正常显示时间器

答案：因为销毁子组件后，时间器都没有清除。导致重新加载了子组件后，时间器又创建了新的，导致每次都会重叠多个时间器。所以，我们将每次销毁的时候，清除时间器即可。

```html
// 修改 Child.vue
<script setup lang="ts">
  import { onUnmounted, onMounted, inject } from "vue";

  const timer = inject("timer");
  const count = inject("count");

  onMounted(() => {
    timer.value = window.setInterval(() => {
      count.value++;
    }, 1000);
  });

  onUnmounted(() => {
    window.clearInterval(timer.value);
  });
</script>

<template>
  <div>
    <p>Child Component: {{ count }}</p>
  </div>
</template>
```

### 2、下一次 DOM 更新

问题：能够获取到 dom 更新的真实元素

答案：因为值的更新是异步的，使用 nextTick 触发微任务。

详情查看官网：[https://cn.vuejs.org/api/general.html#nexttick](https://cn.vuejs.org/api/general.html#nexttick)

```html
<script setup>
  import { nextTick, onMounted, ref } from "vue";

  const count = ref(0);
  const counter = ref(null);

  function increment() {
    count.value++;

    /**
     * DOM is not yet updated, how can we make sure that the DOM gets updated
     * Make the output be true
     */
    nextTick(() => {
      console.log(+counter.value.textContent === 1);
    });
  }
</script>

<template>
  <button ref="counter" @click="increment">{{ count }}</button>
</template>
```

### 3、DOM 传送门

问题：将插槽内容渲染到另一个 DOM 中

答案：使用 teleport，[https://cn.vuejs.org/guide/built-ins/teleport.html](https://cn.vuejs.org/guide/built-ins/teleport.html)

```html
<script setup>
  const msg = "Hello World";
</script>

<template>
  <!-- Renders it to a child element of the `body` -->
  <teleport to="body">
    <span>{{ msg }}</span>
  </teleport>
</template>
```

### 4、动态 CSS

问题：`<style>`  模块支持给 CSS 绑定动态值

答案：使用 v-bind 将 css 值动态绑定，[https://cn.vuejs.org/api/sfc-css-features.html#v-bind-in-css](https://cn.vuejs.org/api/sfc-css-features.html#v-bind-in-css)

```html
<script setup>
  import { ref } from "vue";
  const theme = ref("red");

  const colors = ["blue", "yellow", "red", "green"];

  setInterval(() => {
    theme.value = colors[Math.floor(Math.random() * 4)];
  }, 1000);
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
  /* Modify the code to bind the dynamic color */
  p {
    color: v-bind(theme);
  }
</style>
```

### 5、ref 全家桶

问题：通过 ref 实现数值的加减

答案：ref 的基本用法，[https://cn.vuejs.org/api/reactivity-utilities.html#toref](https://cn.vuejs.org/api/reactivity-utilities.html#toref)

```html
<script setup lang="ts">
  import { isRef, ref, Ref, reactive, toRef } from "vue";

  const initial = ref(10);
  const count = ref(0);

  // Challenge 1: Update ref
  function update(value) {
    // impl...
    count.value = value;
  }

  /**
   * Challenge 2: Check if the `count` is a ref object.
   * Make the output be 1
   */
  console.log(
    // impl ? 1 : 0
    isRef(count) ? 1 : 0
  );

  /**
   * Challenge 3: Unwrap ref
   * Make the output be true
   */
  function initialCount(value: number | Ref<number>) {
    // Make the output be true
    console.log(value === 10);
  }

  initialCount(initial.value);

  /**
   * Challenge 4:
   * create a ref for a property on a source reactive object.
   * The created ref is synced with its source property:
   * mutating the source property will update the ref, and vice-versa.
   * Make the output be true
   */
  const state = reactive({
    foo: 1,
    bar: 2,
  });
  const fooRef = toRef(state, "foo"); // change the impl...

  // mutating the ref updates the original
  fooRef.value++;
  console.log(state.foo === 2);

  // mutating the original also updates the ref
  state.foo++;
  console.log(fooRef.value === 3);
</script>

<template>
  <div>
    <p>
      <span @click="update(count - 1)">-</span>
      {{ count }}
      <span @click="update(count + 1)">+</span>
    </p>
  </div>
</template>
```

### 6、阻止事件冒泡

问题：点击了 click2，不要触发 click1

答案：[https://cn.vuejs.org/guide/essentials/event-handling.html#event-modifiers](https://cn.vuejs.org/guide/essentials/event-handling.html#event-modifiers)

```html
<script setup lang="ts">
  const click1 = () => {
    console.log("click1");
  };

  const click2 = () => {
    console.log("click2");
  };
</script>

<template>
  <div @click="click1()">
    <div @click.stop="click2()">click me</div>
  </div>
</template>
```

### 7、响应性丟失

问题：如何在解构之后依旧保持响应性

答案：toRefs 包裹，[https://cn.vuejs.org/api/reactivity-utilities.html#toref](https://cn.vuejs.org/api/reactivity-utilities.html#toref)

```html
<script setup lang="ts">
  import { reactive, toRefs } from "vue";

  function useCount() {
    const state = reactive({
      count: 0,
    });

    function update(value: number) {
      state.count = value;
    }

    return {
      state: toRefs(state),
      update,
    };
  }
</script>
```

### 8、大写

问题：自定义修饰符 capitalize，实现输入的字符串首字母转成大写

答案：自定义指令，官网的案例，可以参考[https://cn.vuejs.org/guide/components/v-model.html#handling-v-model-modifiers](https://cn.vuejs.org/guide/components/v-model.html#handling-v-model-modifiers)

```html

```
