<template>
  <div id="Transform">
    <Group title="旋转">
      <WzhMarkdown>
        <textarea>
##### 代码如下:
```css
/* 旋转 */
.rotate-static {
  transform-origin: right center;
  transform: rotate(45deg);
}
```
        </textarea>
      </WzhMarkdown>
      <div class="rotate-box">
        <div class="rotate rotate-static"><img :src="require('../../assets/logo.png')" alt="" /></div>
      </div>
    </Group>
    <Group title="旋转动画">
      <WzhMarkdown>
        <textarea>
##### 代码如下:
```css
/* 旋转动画 */
.rotate-transition {
  transform-origin: right center;
  transition: all 0.5s linear;
}
.rotate-transition-gogogo {
  transform: rotate(90deg);
}
```
        </textarea>
      </WzhMarkdown>
      <div class="rotate-box">
        <div :class="`rotate rotate-transition ${this.isRotateTransition ? 'rotate-transition-gogogo' : ''}`"><img :src="require('../../assets/logo.png')" alt="" /></div>
      </div>
      <button @click="addRotateTransition">顺时针90度</button>
    </Group>
    <Group title="无限循旋转动画">
      <WzhMarkdown>
        <textarea>
##### 代码如下:
```css
/* 无限循旋转动画 */
.rotate-animation-infinite {
  transform-origin: right center;
  animation: gogogo 2s infinite linear
}
/* 动画 */
@keyframes gogogo {
  0%{
    transform: rotate(0deg);
  }
  50%{
    transform: rotate(180deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
```
        </textarea>
      </WzhMarkdown>
      <div class="rotate-box">
        <div :class="`rotate ${this.isRotateAnimation ? 'rotate-animation-infinite' : ''}`"><img :src="require('../../assets/logo.png')" alt="" /></div>
      </div>
      <button @click="addRotateAnimation">无限循环动画</button>
    </Group>
  </div>
</template>

<script>
export default {
  name: 'Transform',
  data () {
    return {
      isRotateTransition: false,
      isRotateAnimation: false
    }
  },
  computed: {
  },
  components: {
  },
  methods: {
    addRotateTransition () {
      this.isRotateTransition = !this.isRotateTransition
    },
    addRotateAnimation () {
      this.isRotateAnimation = !this.isRotateAnimation
    }
  }
}
</script>

<style lang=less>
.rotate-box {
  width: 400px;
  height: 400px;
  align-items: center;
  display: flex;
  border: 1px solid #ddd;
  .rotate {
    width: 50%;
    height: 30px;
    background-color: #ddd;
    img {
      height: 30px;
    }
    /* 旋转 */
    &-static {
      transform-origin: right center;
      transform: rotate(45deg);
    }
    /* 旋转动画 */
    &-transition {
      transform-origin: right center;
      transition: all 0.5s linear;
    }
    &-transition-gogogo {
      transform: rotate(90deg);
    }
    /* 无限循旋转动画 */
    &-animation-infinite {
      transform-origin: right center;
      animation: gogogo 2s infinite linear
    }
  }
}

/* 动画 */
@keyframes gogogo {
  0%{
    transform: rotate(0deg);
  }
  50%{
    transform: rotate(180deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
</style>
