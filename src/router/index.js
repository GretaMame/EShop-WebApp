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
import AdminItems from '@/views/AdminItems'
import NewAdminItems from '@/views/NewAdminItems'
import ItemDetails from '@/views/ItemDetails'
import Checkout from '@/views/Checkout'
import Store from '@/store'
Vue.use(Router)

const isAuthenticated = (to, from, next) => {
  if (Store.getters.isAuthenticated) {
    next()
  } else {
    next({name: 'login', query: {redirect: to.path}})
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/user/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: isAuthenticated
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
      path: '/admin/items',
      name: 'adminItems',
      component: AdminItems
    },
    {
      path: '/admin/items/add',
      name: 'adminItemsAdd',
      component: NewAdminItems
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
      path: '/itemdetails/:id',
      name: 'itemdetails',
      component: ItemDetails,
      props: true
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
      beforeEnter: isAuthenticated
    }
  ]
})
