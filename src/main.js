import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css';
import axios from "axios";
import VueRouter from "vue-router";
import router from "./router/router";
import store from "./store/store";
Vue.use(VueRouter);
Vue.prototype.$axios = axios;
Vue.prototype.$httpUrl = 'http://localhost:8090';
Vue.config.productionTip = false
Vue.use(ElementUI,{size: 'small'});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
