<template>
  <!-- autoplay 自动播放 -->
  <audio :src="musicUrl" controls autoplay></audio>
</template>
<script>
export default {
  name: 'audioVue',
  computed: {
    musicUrl() {
      return this.$store.state.musicUrl;
    }
  }
}
</script>

<style>
</style>