import Vue from 'vue'
import VueRouter from 'vue-router'
import Wrapper from './components/Wrapper'
import Group from './components/Group'
import App from './App.vue'
import Hope from './pages/hope/Index.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Croppa from 'vue-croppa';

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(Croppa);

Vue.component('Wrapper', Wrapper)
Vue.component('Group', Group)

const router = new VueRouter({
  routes: [
    { path: '/', component: Hope, meta: { title: 'Hope' } },
    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
