Vue是一种流行的前端JavaScript框架，用于构建用户界面。它被设计成简单易用的，并且可以与其他库或现有项目集成。Vue提供了一种声明性的语法，使用组件化的方式构建用户界面。

Vue具有以下特点：

1. 响应式：Vue使用响应式的数据绑定，使数据的改变能够自动触发界面的更新。
2. 组件化：Vue将用户界面拆分为独立和可重复使用的组件。每个组件包含自己的逻辑、模板和样式，使得开发、维护和复用变得更加简单。
3. 轻量级：Vue的体积较小且性能优秀，加载速度快，适合用于开发单页应用或小型项目。
4. 生态系统：Vue拥有强大的生态系统，包括第三方插件、工具和支持库，使得开发变得更加高效。
5. 双向数据绑定：Vue支持双向数据绑定，可以方便地将数据从组件传递到视图，并根据用户的操作进行更新。

总的来说，Vue是一种功能强大、易学易用的前端框架，适用于构建现代化的、交互丰富的Web应用程序。

结论：更快、更全。写起来更快，可以使用的功能更全。

## 为什么学习vue

我们分别用原生的javascript以及vue实现一个Todo List。大家可以直观感受下这两套代码的。
![[Pasted image 20230805155244.png]]

### 原生Javascript

```html
<!DOCTYPE html>
<html>
<head>
    <title>Todo List</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        .container {
            width: 300px;
            margin: 20px auto;
        }

        #todoInput {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
        }

        #todoList {
            list-style-type: none;
            padding: 0;
        }

        .todoItem {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
        }

        .todoItem input[type="checkbox"] {
            margin-right: 10px;
        }

        .todoItem input[type="text"] {
            flex-grow: 1;
            padding: 5px;
        }

        .todoItem button {
            margin-left: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Todo List</h1>
        <input type="text" id="todoInput" placeholder="Add new todo">
        <ul id="todoList"></ul>
    </div>

    <script>
        const todoInput = document.getElementById('todoInput');
        const todoList = document.getElementById('todoList');

        todoInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                addTodo();
            }
        });

        function addTodo() {
            const todoText = todoInput.value.trim();

            if (todoText !== '') {
                const todoItem = document.createElement('li');
                const checkbox = document.createElement('input');
                const todoTextElement = document.createElement('input');
                const deleteButton = document.createElement('button');

                checkbox.type = 'checkbox';
                todoTextElement.type = 'text';
                todoTextElement.value = todoText;
                deleteButton.textContent = 'Delete';

                deleteButton.addEventListener('click', function() {
                    todoList.removeChild(todoItem);
                });

                todoItem.classList.add('todoItem');
                todoItem.appendChild(checkbox);
                todoItem.appendChild(todoTextElement);
                todoItem.appendChild(deleteButton);

                todoList.appendChild(todoItem);

                todoInput.value = '';
            }
        }
    </script>
</body>
</html>

```

### vue
```html
<!DOCTYPE html>
<html>

<head>
  <title>Vue Todo List</title>
  <style>
    body {
      font-family: Arial, sans-serif;
    }

    .container {
      width: 300px;
      margin: 20px auto;
    }

    #todoInput {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
    }

    #todoList {
      list-style-type: none;
      padding: 0;
    }

    .todoItem {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
    }

    .todoItem input[type="checkbox"] {
      margin-right: 10px;
    }

    .todoItem input[type="text"] {
      flex-grow: 1;
      padding: 5px;
    }

    .todoItem button {
      margin-left: 5px;
    }
  </style>
</head>

<body>
  <div id="app" class="container">
    <h1>Vue Todo List</h1>
    <input type="text" v-model="newTodo" id="todoInput" placeholder="Add new todo" @keydown.enter="addTodo">
    <ul id="todoList">
      <li v-for="(todo, index) in todos" :key="index" class="todoItem">
        <input type="checkbox" v-model="todo.done" />
        <input type="text" v-model="todo.text" />
        <button @click="deleteTodo(index)">Delete</button>
      </li>
    </ul>
  </div>

  <script src="https://unpkg.com/vue@next"></script>
  <script>
    const app = Vue.createApp({
      setup() {
        const newTodo = Vue.ref('');
        const todos = Vue.reactive([]);

        const addTodo = () => {
          const trimmedTodo = newTodo.value.trim();
          if (trimmedTodo !== '') {
            todos.push({ text: trimmedTodo, done: false });
            newTodo.value = '';
          }
        };

        const deleteTodo = (index) => {
          todos.splice(index, 1);
        };

        return {
          newTodo,
          todos,
          addTodo,
          deleteTodo
        };
      }
    });

    app.mount('#app');
  </script>
</body>

</html>
```