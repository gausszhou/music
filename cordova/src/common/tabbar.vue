<template>
  <van-tabbar v-model="active" class="tabbar" active-color="#ee0a24" inactive-color="#000">
    <van-tabbar-item name="home" icon="home-o" @click="goto('home')">首页</van-tabbar-item>
    <van-tabbar-item name="subscribe" icon="search" @click="goto('home')">推荐</van-tabbar-item>
    <van-tabbar-item name="sheet" icon="friends-o" @click="goto('home')">歌单</van-tabbar-item>
    <van-tabbar-item name="mine" icon="setting-o" @click="goto('home')">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'tabbarVue',
  data() {
    return {
      active: 'home'
    };
  },
  methods: {
    goto(name) {
      if (this.$route.name == name) return;
      this.$router.replace({ name });
    }
  },
}
</script>

<style lang="scss" scoped>
</style>