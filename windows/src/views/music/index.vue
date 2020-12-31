<template>
  <div class="discovery-container">
    <el-tabs v-model="tab" @tab-click="switchTab">
      <el-tab-pane name="recommend">
        <span slot="label">
          <i class="iconfont icon-tuijian"></i> 个性推荐
        </span>
      </el-tab-pane>
      <el-tab-pane name="songSheet">
        <span slot="label">
          <i class="iconfont icon-gedan"></i> 歌单
        </span>
      </el-tab-pane>
      <el-tab-pane name="anchorStation">
        <span slot="label">
          <i class="iconfont icon-diantai"></i> 主播电台
        </span>
      </el-tab-pane>
      <el-tab-pane name="rankList">
        <span slot="label">
          <i class="iconfont icon-paixingbang"></i> 排行榜单
        </span>
      </el-tab-pane>
      <el-tab-pane name="singer">
        <span slot="label">
          <i class="iconfont icon-geshou"></i> 歌手
        </span>
      </el-tab-pane>
      <el-tab-pane name="latestMusic">
        <span slot="label">
          <i class="iconfont icon-music"></i> 最新音乐
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
  name: 'music',
  components: {
  },
  data() {
    return {
      tab: 'recommend'
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
