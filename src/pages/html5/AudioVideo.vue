<template>
  <div id="AudioVideo">
    <Group title="Audio(音频)">
      <WzhMarkdown>
        <textarea>
##### 代码如下:

```html
<audio id="clickAudio">
  <!-- <source src="../../assets/medias/a.ogg" /> -->
  <source src="../../assets/medias/a.mp3" />
</audio>
<button id="toggleAudio" onclick="toggleAudioHandle()">play</button>
```

```js
function toggleAudioHandle() {
  var music = document.getElementById('clickAudio');
  var toggle = document.getElementById('toggleAudio');
  if(music.paused){
      music.play();
      toggle.innerHTML = 'Pause';
  }else{
      music.pause();
      toggle.innerHTML = 'Play';
  }
}
```
        </textarea>
      </WzhMarkdown>
      <audio id="clickAudio">
        <source src="../../assets/medias/a.mp3" />
      </audio>
      <p>试一试：<button id="toggleAudio" @click="toggleAudioHandle">Play</button></p>
    </Group>
    <Group title="Video(视频)">
      <WzhMarkdown>
        <textarea>
##### 代码如下:

```html
<video id="clickVideo">
  <source src="../../assets/medias/b.mp4" />
</video>
<button id="toggleVideo" onclick="toggleVideoHandle()">play</button>
```

```js
function toggleVideoHandle() {
  var video = document.getElementById('clickVideo');
  var toggle = document.getElementById('toggleVideo');
  if(video.paused){
      video.play();
      toggle.innerHTML = 'Pause';
  }else{
      video.pause();
      toggle.innerHTML = 'Play';
  }
}
```
        </textarea>
      </WzhMarkdown>
      <video id="clickVideo" width="100%">
        <source src="../../assets/medias/b.mp4" />
      </video>
      <p>试一试：<button id="toggleVideo" @click="toggleVideoHandle">Play</button></p>
    </Group>
  </div>
</template>

<script>
export default {
  name: 'AudioVideo',
  data () {
    return {
    }
  },
  created () {
  },
  components: {
  },
  methods: {
    toggleAudioHandle () {
      var music = document.getElementById('clickAudio');
      var toggle = document.getElementById('toggleAudio');
      if(music.paused){
          music.play();
          toggle.innerHTML = 'Pause';
      }else{
          music.pause();
          toggle.innerHTML = 'Play';
      }
    },
    toggleVideoHandle () {
      var video = document.getElementById('clickVideo');
      var toggle = document.getElementById('toggleVideo');
      if(video.paused){
          video.play();
          toggle.innerHTML = 'Pause';
      }else{
          video.pause();
          toggle.innerHTML = 'Play';
      }
    }
  }
}
</script>

<style>
</style>
