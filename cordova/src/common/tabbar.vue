<template>
  <md-bottom-bar class="tabbar">
    <md-bottom-bar-item @click="goto('home')" :class="$route.path.includes('music')? 'active':'default'">
      <i class="tabbaricon iconfont iconxianshi2"></i>
      <p>听音乐</p>
    </md-bottom-bar-item>
    <md-bottom-bar-item @click="goto('youdao')" :class="$route.name=='youdao'? 'active':'default'">
      <i class="tabbaricon iconfont iconditu1"></i>
      <p>背单词</p>
    </md-bottom-bar-item>
    <md-bottom-bar-item @click="goto('note')" :class="$route.name=='note'? 'active':'default'">
      <i class="tabbaricon iconfont iconditu1"></i>
      <p>看博客</p>
    </md-bottom-bar-item>
  </md-bottom-bar>
</template>

<script>
export default {
  name: 'tabbarVue',
  data() {
    return {

    };
  },
  methods: {
    goto(name) {
      if (this.$route.name == name) return;
      this.$router.replace({ name });
    }
  },
}
</script>

<style lang="scss" scoped>
.tabbar {
  background-color: #fff;
  p {
    margin: 8px 0 0 0;
    font-size: 12px;
  }
}
.active {
  color: rgb(14, 180, 180);
  background-color: rgba(14, 180, 180, 0.1);
}
.default {
  color: #444;
  background-color: #fff;
}
.tabbaricon {
  font-size: 24px;
  line-height: 1;
}
</style>