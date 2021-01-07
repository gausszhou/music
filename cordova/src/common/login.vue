<template>
  <div class="login">
    <div class="logo">
      <img :src="imgSrc" />
    </div>
    <van-form class="login-form" @submit="login">
      <van-field class="input-login" type="tel" v-model="form.phone" label="手机号"></van-field>
      <van-field class="input-login" type="password" v-model="form.password" label="密码"></van-field>
      <van-button class="button-submit" round block type="default" native-type="submit">立即登录</van-button>
      <van-button class="button-skip" round block type="danger" @click="skip">直接体验</van-button>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: require('@/assets/images/logo.png'),
      form: {
        phone: '13177802997',
        password: ''
      }
    };
  },
  methods: {
    login() {
      let params = this.form;
      console.log(this.form);
      this.$http.login(params).then((res) => {
        localStorage.setItem('loginData', JSON.stringify(res.data));
        this.goto('home');
      });
    },
    skip() {
      this.goto('home');
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
  width: 10rem;
  height: 100vh;
  display: flex;
  background: #dc2c1f;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .logo {
    img {
      width: 2rem;
      height: 2rem;
    }
    margin-bottom: 3rem;
  }
  .login-form {
    width: 7.5rem;
    ::v-deep .input-login {
      margin-top: 0.625rem;
      border-radius: 2rem;
      background-color: transparent;
      height: 1rem;
      .van-cell__title.van-field__label {
        color: #eee;
        font-size: 0.375rem;
      }
      .van-field__control {
        color: #eee;
        font-size: 0.375rem;
      }
    }
    .button-submit {
      font-size: 0.375rem;
      margin-top: 1.125rem;
      margin-bottom: 0.625rem;
      height: 1.25rem;
      color: red;
    }
    .button-skip {
      font-size: 0.375rem;
      height: 1.25rem;
      background-color: transparent;
      border: 1px solid rgba(255, 255, 255, 0.5);
    }
  }
}
</style>