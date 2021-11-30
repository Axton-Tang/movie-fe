import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Result from '../components/Result.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Login',
    component: Login
  }, {
    path: '/home',
    name: 'Home',
    component: Home
  }, {
    path: '/result',
    name: 'Result',
    component: Result
  }]
})
