<template>
  <div class="login">
    <form class="login-form">
      <div class="input-box">
        <label>账号</label>
        <input type="text" v-model="form.phone" />
      </div>
      <div class="input-box">
        <label>密码</label>
        <input type="password" v-model="form.password" @enter="login" />
      </div>
      <div class="submit-box">
        <button class="submit-button" @click="login">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        phone: '',
        password: ''
      }
    };
  },
  methods: {
    login() {
      let params = this.form;
      this.$http.login(params).then(() => {
        uni.switchTab({
          url: 'pages/nethome/nethome'
        });
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .login-form {
    min-width: 200px;
  }
  .input-box {
    height: 50px;
    input {
      border-bottom: 1px solid #ccc;
    }
  }
  .submit-box {
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: #ccc;
  }
}
</style>