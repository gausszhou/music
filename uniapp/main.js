import Vue from 'vue'
import App from './App'

import store from "./store";

import http from './request/http.js'
Vue.prototype.$http = http

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App,
     store,
    components:{
      App
    }
})
app.$mount()
