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
    },
    localCart: state => {
      return state.cart
    },
    countCartItemsCount: state => {
      var count = 0
      if (state.cart !== null) {
        for (var cartItem of state.cart) {
          count += cartItem.Count
        }
      }
      return count
    }
  },
  actions: {
    logIn ({ commit }) {
      commit('login')
    },
    logOut ({ commit }) {
      commit('logout')
    },
    addItemToCart ({ commit }, item) {
      commit('addItemToCart', item)
    },
    clearCart ({ commit }) {
      commit('clearCart')
    }
  },
  mutations: {
    login (state) {
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
    },
    clearCart (state) {
      state.cart = null
    }
  },
  plugins: [createPersistedState()]
})

export default store
