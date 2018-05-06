import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      authenticated: false,
      profile: null
    },
    cart: null
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
    },
    addItemToCart ({ commit }, item) {
      commit('addItemToCart', item)
    }
  },
  mutations: {
    login (state, payload) {
      state.user.authenticated = true
    },
    logout (state) {
      state.user.authenticated = false
    },
    addItemToCart (state, item) {
      if (!state.cart) {
        state.cart = []
      }
      for (var cartItem of state.cart) {
        if (cartItem.ItemID === item.ItemID) {
          cartItem.Count += item.Count
          return
        }
      }
      state.cart.push(item)
    }
  },
  plugins: [createPersistedState()]
})

export default store
