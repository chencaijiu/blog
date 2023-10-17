# ReactFlow

### 简化流程图开发的 React 库

## 介绍

在现代 Web 应用开发中，流程图和可视化展示已经成为了常见的需求。为了满足开发者对于流程图的需求，ReactFlow 应运而生。ReactFlow 是一个基于 React 的开源库，旨在简化流程图和图形化展示的开发过程。本文将介绍 ReactFlow 的主要特性和用法，帮助读者快速上手开发流程图应用。

## ReactFlow 的特性

ReactFlow 具有以下主要特性，使其成为开发流程图应用的理想选择：

1. 可定制的节点和连接线：ReactFlow 提供了丰富的节点和连接线组件，可以自定义节点的外观和行为，以满足不同的需求。
2. 可拖拽和缩放：通过 ReactFlow，用户可以轻松地拖拽和缩放流程图，实现自由调整，并且可以通过 API 进行自定义控制。
3. 响应式布局：ReactFlow 支持响应式布局，可以根据不同的屏幕大小和设备自动调整布局，使流程图在不同环境下呈现出最佳效果。
4. 丰富的交互功能：ReactFlow 支持节点的连线、编辑、删除、复制等交互功能，用户可以通过简单的操作实现复杂的业务逻辑。

## 安装

```bash
npm install reactflow
```

## 案例

1. 创建 React 开发环境

```
$ npm create vite@latest
```

然后选择 React，其他随意。

2. 在 App.jsx 顶部写入如下代码

```js
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
```

3. 创建一个 compnent 文件夹，然后创建一个文件 Flow.jsx

```jsx
import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const nodes = [
  {
    id: '1',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
    type: 'input',
  },
  {
    id: '2',
    data: { label: 'World' },
    position: { x: 100, y: 100 },
  },
];

function Flow() {
  return (
    <div style={{ height: '100%' }}>
      <ReactFlow nodes={nodes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
```

4.  在 App.jsx 引入 Flow.jsx

```jsx
import Flow from './component/Flow'


rendert() {
	return <Flow />
}
```

5. 这个时候页面还不显示是因为 html 标签没有样式，打开 App.css 删除之前代码，改为

```css
html,
body,
#root {
  width: 100%;
  height: 100%;
}
```
