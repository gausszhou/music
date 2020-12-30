<template>
  <div id="app">
    <topbar-vue></topbar-vue>
    <index-vue></index-vue>
  </div>
</template>

<script>
import topbarVue from "./common/topbar";
import indexVue from "./common/index";
export default {
  name: 'App',
  components: {
    topbarVue,
    indexVue
  },
  watch: {
    '$store.state.message': {
      handler(newV) {
        this.$message({
          message: newV,
          type: 'error'
        });
      }
    }
  }
}
</script>

<style>
</style>
