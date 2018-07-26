<template>
  <picture class="html5-picture">
    <source type="image/webp" :srcset="_imgSrc('.webp')">
    <img :class="className" :style="imgStyle" :src="_imgSrc()" :alt="imgAlt">
  </picture>
</template>

<script>
// 因为变量路径不能直接require进来，所以采用require.context
// 缺点是：如果images里有冗余图片，webpack也会打包进来
const images = require.context('../images', true, /\.webp|jpg|png|gif$/)

export default {
  name: 'html5-picture',
  props: {
    imgSrc: {
      type: String,
      default: ''
    },
    imgAlt: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    imgStyle: {
      type: String,
      default: ''
    }
  },
  methods: {
    _imgSrc (webp = '') {
      const imgName = this.imgSrc.replace(/.*\/images\//, '')
      return images(`./${imgName}${webp}`)
    }
  }
}
</script>

<style>
</style>
