import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../src/assets/reset.css'

Vue.config.productionTip = false
Vue.prototype.$EventBus = new Vue()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
