<template>
  <div>
    <md-app md-mode="fixed">
      <md-app-toolbar class="md-dense" v-if="$route.name!='blog'">
        <headbar-vue></headbar-vue>
      </md-app-toolbar>
      <md-app-content>
        <keep-alive>
          <router-view class="view"></router-view>
        </keep-alive>
      </md-app-content>
    </md-app>
    <audio-vue v-show="$route.name.includes('net')" v-if="$store.state.isShow" class="vue-audio"></audio-vue>
    <tabbar-vue class="tabbar"></tabbar-vue>
  </div>
</template>

<script>
import headbarVue from "../components/headbar.vue";
import tabbarVue from "../components/tabbar.vue";
import audioVue from "../components/audio.vue";
export default {
  components: {
    headbarVue,
    tabbarVue,
    audioVue
  },
  computed: {
    menuVisible() {
      return this.$store.state.menuVisible;
    }
  }
}
</script>

<style lang="scss" scoped>
.md-app {
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vw;
  min-width: 320px;
  &.md-fixed .md-app-scroller {
    overflow-x: hidden;
  }
  .md-app-content {
    padding: 0;
    margin: 0;
    width: 100vw;
    min-height: 50%;
    .view {
      padding: 0;
      margin: 0;
      padding-bottom: 60px;
      width: 100vw;
    }
  }
  .md-drawer {
    width: 50vw;
    max-width: 200px;
  }
}

.tabbar {
  position: fixed;
  bottom: 0;
}
</style>