<template>
  <div>
    <headbar-vue></headbar-vue>
    <keep-alive>
      <router-view class="view"></router-view>
    </keep-alive>
    <audio-vue v-show="$route.name.includes('net')" v-if="$store.state.isShow" class="vue-audio"></audio-vue>
    <tabbar-vue class="tabbar"></tabbar-vue>
  </div>
</template>

<script>
import headbarVue from "@/common/headbar.vue";
import tabbarVue from "@/common/tabbar.vue";
import audioVue from "@/common/audio.vue";
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
</style>