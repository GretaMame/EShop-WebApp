import axios from 'axios'
import Store from '@/store'
import Router from '@/router'
import Vue from 'vue'

export default function execute () {
    axios.interceptors.response.use(function (response) {
        if (response.headers['x-csrf-cookie']) {
            Vue.cookie.set('CSRF-TOKEN', response.headers['x-csrf-cookie'])
        }
        return response
    }, function (err) {
        if (err.response.status === 401) {
            Store.dispatch('logOut')
            Router.push('/login')
            return
        }
        return Promise.reject(err)
    })
}
