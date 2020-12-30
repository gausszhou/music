<template>
  <div class="index-container">
    <!-- 导航区域 -->
    <sidebar-vue></sidebar-vue>
    <!-- 主体区域 -->
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- 播放标签 -->
    <div class="player">
      <audio-vue></audio-vue>
    </div>
  </div>
</template>

<script>
import audioVue from "./audio";
import sidebarVue from "./sidebar";
export default {
  name: 'index',
  components: {
    audioVue,
    sidebarVue
  }
};
</script>

<style >
</style>
