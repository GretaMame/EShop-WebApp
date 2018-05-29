import Vue from 'vue'
import Router from 'vue-router'
import Profile from '@/views/account/Profile'
import Home from '@/views/Home'
import Login from '@/views/account/Login'
import Register from '@/views/account/Register'
import ForgotPassword from '@/views/account/ForgotPassword'
import AdminUsers from '@/views/AdminUsers'
import ResetPassword from '@/views/account/ResetPassword'
import ConfirmAccount from '@/views/account/ConfirmAccount'
import AdminItems from '@/views/AdminItems'
import NewAdminItems from '@/views/NewAdminItems'
import AdminCategories from '@/views/AdminCategories'
import ItemDetails from '@/views/ItemDetails'
import Checkout from '@/views/Checkout'
import Store from '@/store'
import ShopView from '@/views/mainViews/ShopView'
import AdminView from '@/views/mainViews/AdminView'
import ArchivedAdminItems from '@/views/AdminArchivedItems'
import AdminOrders from '@/views/AdminOrders'
import AdminFeedback from '@/views/AdminFeedback'
Vue.use(Router)

const isAdminAuthenticated = (to, from, next) => {
  if (Store.getters.isAdminAuthenticated) {
    next()
  } else {
    if (Store.getters.isAuthenticated) {
      next({name: 'home'})
    } else {
      next({name: 'login', query: {redirect: to.path}})
    }
  }
}

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
      path: '/',
      component: ShopView,
      redirect: {name: 'home'},
      children: [
        {
          path: '/user/profile',
          component: Profile,
          beforeEnter: isAuthenticated,
          props: { activeName: 'details' }
        },
        {
          path: '/user/orderhistory',
          component: Profile,
          beforeEnter: isAuthenticated,
          props: { activeName: 'orderHistory' }
        },
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/home/:categoryID/',
          name: 'categoryItems',
          component: Home,
          props: true
        },
        {
          path: '/home/:categoryID/:subcategoryID',
          name: 'subcategoryItems',
          component: Home,
          props: true
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
          path: '/cart',
          name: 'cart',
          component: Checkout
        },
        {
          path: '/checkout',
          component: Checkout,
          beforeEnter: isAuthenticated
        }
      ]
    },
    {
      path: '/admin',
      component: AdminView,
      redirect: {name: 'adminOrders'},
      beforeEnter: isAdminAuthenticated,
      children: [
        {
          path: '/admin/users',
          name: 'adminUsers',
          component: AdminUsers,
          beforeEnter: isAdminAuthenticated
        },
        {
          path: '/admin/items',
          name: 'adminItems',
          component: AdminItems,
          beforeEnter: isAdminAuthenticated
        },
        {
          path: '/admin/items/add',
          name: 'adminItemsAdd',
          component: NewAdminItems,
          beforeEnter: isAdminAuthenticated
        },
        {
          path: '/admin/categories',
          name: 'adminCategories',
          component: AdminCategories,
          beforeEnter: isAdminAuthenticated
        },
        {
          path: '/admin/archiveditems',
          name: 'adminArchivedItems',
          component: ArchivedAdminItems,
          beforeEnter: isAdminAuthenticated
        },
        {
          path: '/admin/orders',
          name: 'adminOrders',
          component: AdminOrders,
          beforeEnter: isAdminAuthenticated
        },
        {
          path: '/admin/feedback',
          name: 'adminFeedback',
          component: AdminFeedback,
          beforeEnter: isAdminAuthenticated
        }
      ]
    }
  ]
})
