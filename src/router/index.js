import Vue from 'vue'
import Router from 'vue-router'
import Profile from '@/views/Profile'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import ForgotPassword from '@/views/ForgotPassword'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/user/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/login/forgotpassword',
      name: 'forgotPassword',
      component: ForgotPassword
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
