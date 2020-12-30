<template>
  <div>
    <div class="md-toolbar-row" v-if="$route.name.includes('net')">
      <md-tabs>
        <md-tab id="tab-home" md-label="主页" @click="goto('nethome')"></md-tab>
        <md-tab id="tab-search" md-label="搜索" @click="goto('netsearch')"></md-tab>
      </md-tabs>
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