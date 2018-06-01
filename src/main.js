import Vue from 'vue'
import App from './App.vue'
import NotFound from './NotFound.vue'
import HTML5 from './pages/html5/Index.vue'
import CSS3 from './pages/css3/Index.vue'

Vue.config.productionTip = false

const routes = {
  '/': App,
  '/html5': HTML5,
  '/css3': CSS3
}

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent)}
})
