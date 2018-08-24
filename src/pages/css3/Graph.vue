<template>
  <div id="Graph">
    <Group title="图形"> 
      <div class="graph-box" :class="{'animate': goAnimate}">
        <div class="sector" v-for="item in sectors" :key="item.id">
          <div class="sector-delivery">
            <div class="sector-panel">
              <div class="sector-panel-content"><img :src="item.src" :alt="item.title" /></div>
            </div>
          </div>
        </div>
      </div>
      <button @click="toggleAnimate()">开始</button>
    </Group>
  </div>
</template>

<script>
export default {
  name: 'Graph',
  data () {
    return {
      goAnimate: false,
      sectors: [{
        title: 'logo',
        id: '1',
        src: require('../../assets/logo.png')
      },{
        title: 'logo',
        id: '2',
        src: require('../../assets/logo.png')
      },{
        title: 'logo',
        id: '3',
        src: require('../../assets/logo.png')
      },{
        title: 'logo',
        id: '4',
        src: require('../../assets/logo.png')
      },{
        title: 'logo',
        id: '5',
        src: require('../../assets/logo.png')
      },{
        title: 'logo',
        id: '6',
        src: require('../../assets/logo.png')
      },{
        title: 'logo',
        id: '7',
        src: require('../../assets/logo.png')
      }] 
    }
  },
  computed: {
  },
  components: {
  },
  methods: {
    toggleAnimate () {
      this.goAnimate = !this.goAnimate
    }
  }
}
</script>

<style lang="less">
@counter: 7;
@diameter: 600px;

@perdeg: 360deg / @counter;
@r: `Math.round(55 + Math.random() * 200)`;
@g: `Math.round(55 + Math.random() * 200)`;
@b: `Math.round(55 + Math.random() * 200)`;
@contentWidth: sin(@perdeg / 2) * @diameter / 2;
// 循环
.loop(@counter, @i: 1) when (@i =< @counter) {
  .sector:nth-of-type(@{i}) {
    transform: rotate((@i - 1) * @perdeg);
    color: rgb(@r, @g, @b);
  }
  .loop(@counter, (@i + 1))
}
.graph-box{
  width: @diameter;
  height: @diameter;
  .sector {
    width: @diameter;
    height: @diameter;
    position: absolute;
    clip: rect(0 @diameter @diameter @diameter/2);
    overflow: hidden;
    &-delivery {
      width: 100%;
      height: 100%;
      background: currentColor;
      position: absolute;
      clip: rect(0 @diameter/2 @diameter 0);
      transform: rotate(@perdeg);
      border-radius: 50%;
    }
    &-panel {
        position: absolute;
        width: 0;
        height: 50%;
        background-color: #333;
        margin-left: @diameter/2;
        transform-origin: bottom;
        transform: rotate(360deg - @perdeg/2);
        color: #fff;
        box-sizing: border-box;
        padding-top: @diameter/10;
        &-content {
          position: absolute;
          width: @contentWidth;
          left: 50%;
          margin-left: -@contentWidth/2;
          text-align: center;
          img {
            width: 100%;
          }
        }
      }
  }
  .loop(@counter);
  &.animate {
    transform: rotate(5545deg);
    transition: all 10s ease-in-out;
  }
}

</style>
