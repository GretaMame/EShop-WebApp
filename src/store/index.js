import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      authenticated: false,
      token: '',
      profile: null
    }
  },
  getters: {
    isAuthenticated: state => {
      return state.user.authenticated
    },
    token: state => {
      return state.user.token
    }
  },
  actions: {
    logIn ({ commit }, payload) {
      commit('login', payload)
    },
    logOut ({ commit }) {
      commit('logout')
    }
  },
  mutations: {
    login (state, payload) {
      state.user.authenticated = true
      console.log(payload.data.token)
      state.user.token = payload.data.token
    },
    logout (state) {
      state.user.authenticated = false
      state.user.token = ''
    }
  },
  plugins: [createPersistedState()]
})

export default store
