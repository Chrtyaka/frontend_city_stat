import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from "./routes";
import Chartkick from 'chartkick'
import VueChartkick from 'vue-chartkick'
import VueResource from 'vue-resource'

Vue.use(VueResource);
Vue.use(VueChartkick, { Chartkick });
Vue.use(VueRouter);
Vue.http.options.root = 'http://127.0.0.1:5000/';
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';
const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
