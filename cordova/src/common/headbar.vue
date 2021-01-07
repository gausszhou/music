<template>
  <div class="navbar">
    <!-- 搜索页 -->
    <van-nav-bar
      v-if="$route.name=='search'"
      :title="$route.meta.title"
      left-text="返回"
      left-arrow
      @click-left="goto('home')"
    />
    <!-- 首页 -->
    <van-nav-bar v-else :title="$route.meta.title" @click-left="menuChange" @click-right="goto('search')">
      <template #left>
        <van-icon name="manager-o" size="18" />
      </template>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
  </div>
</template>



<script>
export default {
  name: 'headbar',
  props: {
    model: {
      type: [Object]
    }
  },
  methods: {
    menuChange() {
      this.$store.commit('setMenuVisible', !this.$store.state.menuVisible);
    },
    goto(name) {
      if (this.$route.name == name) return;
      this.$router.replace({ name });
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  z-index: 99;
  top: 0;
  width: 100vw;
  height: 1.5625rem;
  background-color: #fff;
}
</style>