import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import WzhMarkdown from './components/WzhMarkdown'
import Wrapper from './components/Wrapper'
import Group from './components/Group'
import App from './App.vue'
import Home from './Home.vue'
import NotFound from './NotFound.vue'
import HTML5 from './pages/html5/Index.vue'
import CSS3 from './pages/css3/Index.vue'
import VUE from './pages/vue/Index.vue'
import WEBP from './pages/webp/Index.vue'
import Chart from './pages/chart/Index.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

Vue.component('WzhMarkdown', WzhMarkdown)
Vue.component('Wrapper', Wrapper)
Vue.component('Group', Group)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/html5', component: HTML5, meta: { title: 'html5展示' } },
    { path: '/css3', component: CSS3, meta: { title: 'css3展示' } },
    { path: '/vue', component: VUE, meta: { title: 'vue展示' } },
    { path: '/webp', component: WEBP, meta: { title: 'webp展示' } },
    { path: '/chart', component: Chart, meta: { title: 'ChartJs展示' } },
    { path: '*', component: NotFound }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
