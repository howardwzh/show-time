<template>
  <div id="Notification">
    <Group title="用户权限">
      <VueMarkdown>
Notification.permission 该属性用于表明当前通知显示的授权状态，可能的值包括：

- default ：不知道用户的选择，默认。
- granted ：用户允许。
- denied ：用户拒绝。

代码如下:
```js
if(Notification.permission === 'granted'){
  console.log('用户允许通知');
}else if(Notification.permission === 'denied'){
  console.log('用户拒绝通知');
}else{
  console.log('用户还没选择，去向用户申请权限吧');
}
```
      </VueMarkdown>
      试一试：<button @click="check">检查权限</button>
    </Group>
    <Group title="请求权限">
      <VueMarkdown>
Notification 对象提供了 requestPermission() 方法请求用户当前来源的权限以显示通知，基于 promise 的语法

代码如下:
```js
Notification.requestPermission().then(function(permission) {
  if(permission === 'granted'){
    console.log('用户允许通知');
  }else if(permission === 'denied'){
    console.log('用户拒绝通知');
  }
});
```
      </VueMarkdown>
      试一试：<button @click="request">请求权限</button>
    </Group>
    <button @click="send">发送通知</button>
    <button @click="sendAndShut">发送通知3秒后自动关闭</button>
    <button @click="sendAndAddEvent">发送通知点击弹框触发事件</button>
  </div>
</template>

<script>
const icon = require('../../assets/logo.png')

export default {
  name: 'Notification',
  components: {
  },
  methods: {
    check () {
      if(Notification.permission === 'granted'){
          console.log('用户允许通知')
      }else if(Notification.permission === 'denied'){
          console.log('用户拒绝通知')
      }else{
          console.log('用户还没选择，去向用户申请权限吧')
      }
    },
    request () {
      Notification.requestPermission().then(function(permission) {
        if(permission === 'granted'){
            console.log('用户允许通知')
        }else if(permission === 'denied'){
            console.log('用户拒绝通知')
        }
      })
    },
    send () {
      new Notification('状态更新提醒',{
        body: '你的朋友圈有3条新状态，快去查看吧',
        icon,
      })
    },
    sendAndShut () {
      const n = new Notification('状态更新提醒',{
        body: '你的朋友圈有3条新状态，快去查看吧',
        icon,
      })
      setTimeout(function() {
        n.close()
      }, 3000)
    },
    sendAndAddEvent () {
      var n = new Notification('状态更新提醒',{
          body: '你的朋友圈有3条新状态，快去查看吧',
          icon,
          data: {
            url: 'http://bing.com'
          }
      })
      n.onclick = function(){
        window.open(n.data.url, '_blank')      // 打开网址
        n.close()                              // 并且关闭通知
      }
    }
  }
}
</script>

<style>
</style>
