<template>
  <div>
    <div class="md-toolbar-row" v-if="$route.path.includes('net')">
      <div >
        <div id="tab-home" md-label="主页" @click="goto('nethome')"></div>
        <div id="tab-search" md-label="搜索" @click="goto('netsearch')"></div>
      </md-tabs>
    </div>
  </div>
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
      this.model.menuVisible = !this.model.menuVisible;
    },
    goto(name) {
      if (this.$route.name == name) return;
      this.$router.replace({ name });
    }
  },
}
</script>

<style lang="scss" scoped>
 
</style>