// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
import store from '@/store'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import '../theme/index.css'
import '../theme/display.css'
import interceptor from '@/helpers/httpInterceptor.js'
import VueCookie from 'vue-cookie'

Vue.component('icon', Icon)
Vue.use(VueAxios, axios)
Vue.use(VueCookie)

// Vue.axios.defaults.baseURL = 'http://localhost:60014/api/'
// zVue.axios.defaults.baseURL = 'http://localhost:5000/api/'
Vue.axios.defaults.baseURL = 'https://eshop-qa-api.azurewebsites.net/api/'
Vue.axios.defaults.withCredentials = true
Vue.axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
Vue.axios.defaults.xsrfHeaderName = 'X-CSRF-TOKEN'

Vue.use(ElementUI, {locale})
Vue.config.productionTip = false

interceptor()

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
