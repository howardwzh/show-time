<template>
  <div id="Graph">
    <Group title="图形"> 
      <div class="graph-box">
        <div class="sector">
          <div class="sector-delivery">
            <div class="sector-panel">
              <div class="sector-panel-content"><img src="../../assets/logo.png" alt="" /></div>
            </div>
          </div>
        </div>
        <div class="sector">
          <div class="sector-delivery">
            <div class="sector-panel">
              <div class="sector-panel-content"><img src="../../assets/logo.png" alt="" /></div>
            </div>
          </div>
        </div>
        <div class="sector">
          <div class="sector-delivery">
            <div class="sector-panel">
              <div class="sector-panel-content"><img src="../../assets/logo.png" alt="" /></div>
            </div>
          </div>
        </div>
        <div class="sector">
          <div class="sector-delivery">
            <div class="sector-panel">
              <div class="sector-panel-content"><img src="../../assets/logo.png" alt="" /></div>
            </div>
          </div>
        </div>
        <div class="sector">
          <div class="sector-delivery">
            <div class="sector-panel">
              <div class="sector-panel-content"><img src="../../assets/logo.png" alt="" /></div>
            </div>
          </div>
        </div>
      </div>
    </Group>
  </div>
</template>

<script>
export default {
  name: 'Graph',
  data () {
    return {
    }
  },
  computed: {
  },
  components: {
  },
  methods: {
  }
}
</script>

<style lang="less">
@counter: 5;
@diameter: 600px;

@perdeg: 360deg / @counter;
@r: `Math.round(55 + Math.random() * 200)`;
@g: `Math.round(55 + Math.random() * 200)`;
@b: `Math.round(55 + Math.random() * 200)`;
@contentWidth: sin(@perdeg / 2) * @diameter / 3;
// 循环
.loop(@counter, @i: 1) when (@i =< @counter) {
  .sector:nth-of-type(@{i}) {
    transform: rotate((@i - 1) * @perdeg);
    color: rgb(@r, @g, @b);
  }
  .loop(@counter, (@i + 1))
}
.graph-box{
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
        padding-top: @diameter/6;
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
}
</style>
