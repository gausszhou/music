<template>
  <div class="top-container">
    <div class="left-box">
      <div class="icon-wrapper">
        <a href="http://netmusic.gausszhou.top" target="__blank">后台接口</a>
      </div>
      <div class="history-wrapper">
        <span class="iconfont icon-arrow-left" @click="go(-1)"></span>
        <span class="iconfont icon-arrow-right" @click="go(1)"></span>
      </div>
    </div>
    <div class="right-box">
      <el-button class="button-login" type="primary" size="small" @click="loginDialogOpen">登录</el-button>
      <div class="el-input el-input--small el-input--prefix">
        <input
          v-model.trim="query"
          @keyup.enter="search"
          type="text"
          autocomplete="off"
          placeholder="搜索"
          class="el-input__inner"
        />
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
    </div>
    <loginDialog v-if="loginDialogVisible" @change="loginDialogChange"></loginDialog>
  </div>
</template>

<script>
import loginDialog from "@/components/dialogModules/loginDialog.vue";
export default {
  name: 'topbarVue',
  components: {
    loginDialog
  },
  data() {
    return {
      query: '',
      loginDialogVisible: false,
    };
  },
  methods: {
    loginDialogOpen() {
      this.loginDialogVisible = true;
    },
    loginDialogChange() {
      this.loginDialogVisible = false;
    },
    search() {
      if (this.query) {
        this.$store.commit('setQuery', this.query);
        this.$router.replace({
          name: 'searchResult',
          query: {
            keywords: this.query
          }
        });
      } else {
        this.$message({
          message: '请输入有效内容',
          type: 'warning'
        });
      }
    },
    go(num) {
      this.$router.go(num);
    }
  },
}
</script>

<style scoped>
.button-login {
  margin: 0 10px;
}
</style>
