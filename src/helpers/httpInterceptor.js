import axios from 'axios'
import Store from '@/store'
import Vue from 'vue'

export default function execute () {
    axios.interceptors.response.use(function (response) {
        if (response.headers['x-csrf-cookie']) {
            Vue.cookie.set('CSRF-TOKEN', response.headers['x-csrf-cookie'])
        }
        return response
    }, function (err) {
        if (err.response && err.response.status === 401) {
            Store.dispatch('logOut')
            err.cookieExpired = true
        }
        return Promise.reject(err)
    })
}
