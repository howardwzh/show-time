<template>
  <div id="WEBP">
    <Wrapper title="webp vs jpg">
      <Group title="webp - size: 9k">
        <ImageWebp className="webp-image" imgStyle="width: 200px;" imgSrc="./images/universe.jpg" imgAlt="webp" />
      </Group>
      <Group title="jpg - size: 30k">
        <img style="width: 200px;" src="./images/universe.jpg" alt="" />
      </Group>
    </Wrapper>
    <Wrapper title="webp vs png">
      <Group title="webp - size: 8k">
        <ImageWebp className="webp-image" imgSrc="./images/happiness.png" imgAlt="webp" />
      </Group>
      <Group title="png - size: 40k">
        <img src="./images/happiness.png" alt="" />
      </Group>
    </Wrapper>
    <Wrapper title="webp vs gif">
      <Group title="webp - size: 4k">
        <ImageWebp className="webp-image" imgStyle="width: 200px;" imgSrc="./images/banana.gif" imgAlt="webp" />
      </Group>
      <Group title="gif - size: 87k">
        <img style="width: 200px;" src="./images/banana.gif" alt="" />
      </Group>
    </Wrapper>
  </div>
</template>

<script>
import ImageWebp from './components/ImageWebp'

export default {
  name: 'WEBP',
  components: {
    ImageWebp
  }
}
</script>

<style>
</style>
