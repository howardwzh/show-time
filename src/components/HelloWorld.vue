<template>
  <div id="HelloWorld">
    <h1>{{ msg }}</h1>
    <p>
      这里将展示一些好玩的技术效果，为抽象技术知识提供的展示平台和实锤。
    </p>
    <h3>基础知识</h3>
    <ul>
      <li><a href="#/html5">HTML5</a></li>
      <li><a href="#/css3">CSS3</a></li>
    </ul>
    <h3>框架</h3>
    <ul>
      <li><a href="#/vue">Vue</a></li>
    </ul>
    <h3>性能</h3>
    <ul>
      <li><a href="#/webp">Webp</a></li>
    </ul>
    <h3>视觉系</h3>
    <ul>
      <li><a href="#/chart">ChartJS</a></li>
      <li><a href="https://howardwzh.gitlab.io/page-painter">Skrollr</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
