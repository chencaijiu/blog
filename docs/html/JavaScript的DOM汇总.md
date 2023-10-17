# JavaScript 的 DOM 操作汇总

JavaScript 是一种常用的编程语言，它可以通过操作文档对象模型（DOM）来控制网页的内容和结构。DOM 是一种树状结构，它表示 HTML 文档中的元素和属性。本文将汇总 JavaScript 中常用的 DOM 操作方法。

## 获取元素

- **getElementById(id)**：通过元素的 id 属性获取元素。
- **getElementsByClassName(bclass)**：通过元素的 class 属性获取元素，返回一个集合。可以使用索引访问集合中的元素。
- **getElementsByTagName(tag)**：通过元素的标签名获取元素，返回一个集合。
- **querySelector(selector)**：通过 CSS 选择器获取元素，返回匹配的第一个元素。
- **querySelectorAll(selector)**：通过 CSS 选择器获取元素，返回匹配的所有元素。

## 操作元素

- **innerHTML**：获取或设置元素的 HTML 内容。
- **innerText**：获取或设置元素的文本内容，不包含 HTML 标签。
- **setAttribute(name, value)**：设置元素的属性。
- **getAttribute(name)**：获取元素的属性。
- **removeAttribute(name)**：移除元素的属性。
- **appendChild(node)**：向元素的子节点列表末尾添加新的子节点。
- **removeChild(node)**：从元素的子节点列表中移除子节点。
- **replaceChild(newNode, oldNode)**：替换元素的指定子节点。
- **cloneNode()**：复制元素及其子节点。

## 事件处理

- **addEventListener(event, function)**：添加事件处理程序。
- **removeEventListener(event, function)**：移除事件处理程序。

## 样式操作

- **className**：获取或设置元素的 class 属性。
- **classList**：获取元素的 classList 对象，可以用于添加、移除和切换 class。
- **style.property**：获取或设置元素的样式属性。

以上是 JavaScript 中常用的 DOM 操作方法。使用这些方法可以方便地控制网页的内容和结构。

除了上述列举的操作元素、获取元素、事件处理和样式操作外，还有一些其他的常用 DOM 操作方法，比如：

- **createElement(tag)**：创建一个指定类型的元素节点。
- **createTextNode(text)**：创建一个文本节点。
- **insertBefore(newNode, referenceNode)**：在指定的 referenceNode 节点之前插入一个新的子节点。
- **focus()**：使元素获得焦点。
- **blur()**：使元素失去焦点。
- **scrollIntoView()**：将元素滚动到可见区域。
- **getBoundingClientRect()**：获取元素的大小和位置信息。

需要注意的是，DOM 操作可能会对性能产生影响，因此应该尽量减少不必要的操作。此外，由于不同浏览器对 DOM 操作的支持程度存在差异，建议在开发过程中进行充分的兼容性测试。
