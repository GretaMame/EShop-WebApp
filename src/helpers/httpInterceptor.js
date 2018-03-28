import axios from 'axios'
import Vue from 'vue'
import Store from '@/store'
import Router from '@/router'

export default function execute () {
    axios.interceptors.request.use(function (config) {
        var xsrfToken = Vue.cookie.get('CSRF-TOKEN')
        if (xsrfToken) {
            config.headers['X-CSRF-TOKEN'] = xsrfToken
        }
        return config
    }, function (err) {
        console.log(err)
        return Promise.reject(err)
    })

    axios.interceptors.response.use(function (response) {
        return response
    }, function (err) {
        if (err.response.status === 401) {
            Store.dispatch('logOut')
            Router.push('/login')
            return
        }

        let originalRequest = err.config
        if (err.response.status === 400 && !originalRequest._retry) {
            originalRequest._retry = true
            // maybe the CSRF-TOKEN is not valid get new token and retry
            return axios.get('account/testconnection').then(resp => {
                return axios(err.config)
            })
        }
        return Promise.reject(err)
    })
}
