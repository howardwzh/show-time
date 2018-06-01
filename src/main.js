import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'
import App from './App.vue'
import NotFound from './NotFound.vue'
import HTML5 from './pages/html5/Index.vue'
import CSS3 from './pages/css3/Index.vue'

Vue.config.productionTip = false
Vue.use(VueRouter) 

const router = new VueRouter({
  routes: [
    { path: '/', component: App },
    { path: '/html5', component: HTML5 },
    { path: '/css3', component: CSS3 },
    { path: '*', component: NotFound }
  ]
})

new Vue({
  el: '#app',
  router,
  template: '<router-view></router-view>'
})
