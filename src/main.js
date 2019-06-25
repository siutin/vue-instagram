import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
import VueLodash from 'vue-lodash'
import router from './router'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  lazyComponent: true,
  observer: true,
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  }
})

Vue.use(VueLodash)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
