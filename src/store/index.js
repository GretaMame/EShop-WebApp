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
    },
    deleteItem ({ commit }, id) {
      commit('deleteItem', id)
    },
    updateItems ({ commit }, items) {
      commit('updateItems', items)
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
    },
    deleteItem (state, id) {
      for (var i = 0; i < state.cart.length; i++) {
        if (state.cart[i].ItemID === id) {
          state.cart.splice(i, 1)
          break
        }
      }
    },
    updateItems (state, items) {
      for (var newItem of items) {
        for (var cartItem of state.cart) {
          if (newItem.ItemID === cartItem.ItemID) {
            cartItem.count = newItem.Count
            break
          }
        }
      }
    }
  },
  plugins: [createPersistedState()]
})

export default store
