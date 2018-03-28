import axios from 'axios'
import Store from '@/store'
import Router from '@/router'

export default function execute () {
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
