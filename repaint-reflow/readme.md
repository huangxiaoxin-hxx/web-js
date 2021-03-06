# 重绘(repaint)：
- 当元素样式的改变不影响布局时，浏览器将使用重绘对元素进行更新，此时由于只需要 UI 层面的重新像素绘制，因此损耗较少。

常见的重绘操作有：

改变元素颜色
改变元素背景色

# 回流(reflow)：
- 又叫重排（layout）。当元素的尺寸、结构或者触发某些属性时，浏览器会重新渲染页面，称为回流。此时，浏览器需要重新经过计算，计算后还需要重新页面布局，因此是较重的操作。

常见的回流操作有：

页面初次渲染
浏览器窗口大小改变
元素尺寸/位置/内容发生改变
元素字体大小变化
添加或者删除可见的 DOM 元素
激活 CSS 伪类（:hover……）


重点：回流必定会触发重绘，重绘不一定会触发回流。重绘的开销较小，回流的代价较高。

# 避免大量使用重绘与回流

避免频繁操作样式，可汇总后统一一次修改
尽量使用 class 进行样式修改，而不是直接操作样式
减少 DOM 的操作，可使用字符串一次性插入