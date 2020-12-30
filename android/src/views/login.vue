<template>
  <div class="login">
    <form class="login-form">
      <md-field md-inline>
        <label>账号</label>
        <md-input type="text" v-model="form.phone" clearable></md-input>
      </md-field>
      <md-field md-inline>
        <label>密码</label>
        <md-input type="password" v-model="form.password" @enter="login" clearable></md-input>
      </md-field>
      <div class="submit-box">
        <md-button class="submit-button" @click="login">Submit</md-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        phone: '13177802997',
        password: ''
      }
    };
  },
  methods: {
    login() {
      let params = this.form;
      this.$http.login(params).then((res) => {
        console.log(res.data.profile.userId);
        localStorage.setItem('loginData', JSON.stringify(res.data));
        this.goto('nethome');
      });
    },
    goto(name) {
      if (this.$route.name == name) return;
      this.$router.replace({ name });
    }
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
  .submit-box {
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: #ccc;
    padding: 0;
    .md-button {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }
  }
}
</style>