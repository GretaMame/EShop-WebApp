import axios from 'axios'
import Vue from 'vue'

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
}
