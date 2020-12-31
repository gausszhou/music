<template>
  <div class="discovery-container">
    <el-tabs v-model="tab" @tab-click="switchTab">
      <el-tab-pane name="latestMV">
        <span slot="label">
          <i class="iconfont icon-new"></i>
          最新MV
        </span>
      </el-tab-pane>
      <el-tab-pane name="allMV">
        <span slot="label">
          <i class="iconfont icon-all"></i>
          全部MV
        </span>
      </el-tab-pane>
    </el-tabs>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'video',
  components: {
  },
  data() {
    return {
      tab: 'latestMV'
    };
  },
  watch: {
    '$route.name': {
      handler(newV) {
        this.tab = newV;
      }
    }
  },
  methods: {
    switchTab() {
      this.goto(this.tab);
    },
    goto(name) {
      if (this.$route.name == name) return;
      this.$router.replace({ name });
    },
  }
}
</script>

<style scoped>
.iconfont {
  font-size: 20px;
  line-height: 40px;
}
</style>
