<template>
  <div id="Notification">
    <Group title="用户权限">
      <VueMarkdown>
Notification.permission 该属性用于表明当前通知显示的授权状态，可能的值包括：

- default ：不知道用户的选择，默认。
- granted ：用户允许。
- denied ：用户拒绝。

##### 代码如下:
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

##### 代码如下:
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
    <Group title="发送通知">
      <VueMarkdown>
获取用户授权之后，就可以推送通知了。`const notification = new Notification(title, options)`

- title：通知的标题
- options：通知的设置选项（可选）。
  - body：通知的内容。
  - tag：代表通知的一个识别标签，相同tag时只会打开同一个通知窗口。
  - icon：要在通知中显示的图标的URL。
  - image：要在通知中显示的图像的URL。
  - data：想要和通知关联的任务类型的数据。
  - requireInteraction：通知保持有效不自动关闭，默认为false。

##### 代码如下：
```js
const n = new Notification('新的消息通知',{
    body: '你的宝贝已经在老司机护送下出发了。',
    tag: 'shop',
    icon: require('../../assets/logo.png'),
    requireInteraction: true
})
```
      </VueMarkdown>
      试一试：<button @click="send">发送通知</button>
    </Group>
    <Group title="关闭通知">
      <VueMarkdown>
new实例化之后的对象，可以调用 close() 方法来关闭通知

##### 代码如下：
```js
// 3秒后自动关闭
setTimeout(function() {
    n.close();
}, 3000);
```
      </VueMarkdown>
      试一试：<button @click="sendAndShut">发送通知3秒后自动关闭</button>
    </Group>
    <Group title="添加事件">
      <VueMarkdown>
new实例化之后的对象，可以绑定 onclick 事件

##### 代码如下：
```js
var n = new Notification('新的消息通知',{
    body: '你的宝贝已经在老司机护送下出发了。',
    data: {
        url: 'http://www.google.com'
    }
})

n.onclick = function(){
    window.open(n.data.url, '_blank');      // 打开网址
    n.close();                              // 并且关闭通知
}
```
      </VueMarkdown>
      试一试：<button @click="sendAndAddEvent">发送通知点击弹框触发事件</button>
    </Group>
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
      const n = new Notification('状态更新提醒',{
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
