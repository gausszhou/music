<template>
  <div class="index-container">
    <!-- 导航区域 -->
    <sidebar-vue class="side"></sidebar-vue>
    <!-- 主体区域 -->
    <div class="main">
      <!-- 一级路由入口 -->
      <router-view></router-view>
    </div>
    <!-- 播放标签 -->
    <audio-vue></audio-vue>
  </div>
</template>

<script>
import audioVue from "@/common/audio";
import sidebarVue from "@/common/sidebar";
export default {
  name: 'index',
  components: {
    audioVue,
    sidebarVue
  }
};
</script>

<style lang="scss" scoped>
.side {
  position: fixed;
  top: 40px;
  height: calc(100vh - 120px);
}
.main {
  margin-left: 160px;
}
</style>
