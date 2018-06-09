<template>
  <div id="Canvas">
    <Group title="用户权限">
      <WzhMarkdown>
        <textarea>
Canvas本质上是一个位图画布。

- 首先要获取其上下文（context）
- 接着在上下文中执行动作
- 最后将这些动作应用到上下文中（stroke）

##### 代码如下:

```html
<canvas id="diagonal" style="border:1px solid #999;" width="200" height="200"></canvas>
```

```js
function drawDiagonal(){
  //取的canvas元素及其绘图上下文
  var canvas = document.getElementById(‘diagonal’);
  var context = canvas.getContext('2d');
  // 用绝对坐标来创建一条路径
  context.beginPath();
  context.moveTo(70,140);
  context.lineTo(140,70);
  // 将这条线绘制到canvas上
  context.stroke();
}
```
        </textarea>
      </WzhMarkdown>
      <canvas id="diagonal" style="border:1px solid #999;" width="200" height="200"></canvas>
      <p>试一试：<button @click="drawDiagonal">画一条线</button></p>
    </Group>
  </div>
</template>

<script>
export default {
  name: 'Canvas',
  data () {
    return {
    }
  },
  created () {
  },
  components: {
  },
  methods: {
    drawDiagonal () {
      //取的canvas元素及其绘图上下文
      var canvas = document.getElementById('diagonal');
      var context = canvas.getContext('2d');
      // 用绝对坐标来创建一条路径
      context.beginPath();
      context.moveTo(70,140);
      context.lineTo(140,70);
      // 将这条线绘制到canvas上
      context.stroke();
    }
  }
}
</script>

<style>
</style>
