import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      authenticated: false,
      profile: null
    }
  },
  getters: {
    isAuthenticated: state => {
      return state.user.authenticated
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
    },
    logout (state) {
      state.user.authenticated = false
    }
  },
  plugins: [createPersistedState()]
})

export default store
