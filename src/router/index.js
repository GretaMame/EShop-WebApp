import Vue from 'vue'
import Router from 'vue-router'
import Profile from '@/views/account/Profile'
import Home from '@/views/Home'
import Login from '@/views/account/Login'
import Register from '@/views/account/Register'
import ForgotPassword from '@/views/account/ForgotPassword'
import AdminUsers from '@/views/AdminUsers'
import Cart from '@/views/Cart'
import ResetPassword from '@/views/account/ResetPassword'
import ConfirmAccount from '@/views/account/ConfirmAccount'
import Checkout from '@/views/Checkout'
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
    },
    {
      path: '/admin',
      redirect: {name: 'adminUsers'}
    },
    {
      path: '/admin/users',
      name: 'adminUsers',
      component: AdminUsers
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/resetpassword',
      name: 'resetpassword',
      component: ResetPassword
    },
    {
      path: '/confirmaccount',
      name: 'confirmaccount',
      component: ConfirmAccount
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    }
  ]
})
