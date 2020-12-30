<template>
  <div class="nav">
    <ul>
      <li>
        <router-link :to="{name:'recommend'}" :class="{'router-link-active':$route.path.includes('discoveryMusic')}">
          <span class="iconfont"></span>
          发现音乐
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'latestMV'}" :class="{'router-link-active':$route.path.includes('discoveryVideo')}">
          <span class="iconfont"></span>
          发现视频
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sidebarVue'
}
</script>

<style scoped>
.nav {
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
}
</style>