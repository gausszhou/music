// 引入vue
import Vue from "vue";
// 引入主视图
import App from "./App.vue";
// 引入路由对象
import router from "./router";

// 引入UI组件库 

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);


import "@/assets/css//common.scss";
import "@/assets/css/iconfont.css";
import "@/assets/css/mobile.scss";


// 引入过滤器
import filters from "./utils/filters";
Vue.use(filters);

// 引入store,将store变为全局仓库
import store from "./store";

// 引入管理后的接口
import http from "./request/http";
Vue.prototype.$http = http;

// 全局配置
// 组织生产环境的消息提示
Vue.config.productionTip = false;

// new Vue 配置路由,状态,渲染组件,挂载组件
new Vue({
  router,
  store,
  render: h => h(App),
  components: {
    App
  }
}).$mount("#app");
