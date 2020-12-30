// 引入vue
import Vue from 'vue';
// 引入入口
import App from './App';
// 引入路由
import router from './router';
// 引入全局状态
import store from './store';
// 引入Element UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// 引入全局样式
import "./assets/css/common.css";
import "./assets/css/customize.css";
import "./assets/css/iconfont.css";
import "./assets/css/element.css";
// 引入http接口
import http from './request/http';
Vue.prototype.$http = http;
// 引入一些工具方法
import tools from "./utils/tools";
Vue.prototype.$tools = tools;
// 引入过滤器
import filters from "./utils/filters";
Vue.use(filters);
// 关闭生成环境的提示
Vue.config.productionTip = false;
// 下面这行注释不要删，用来关闭eslint
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: {
    App
  }
}).$mount("#app");
