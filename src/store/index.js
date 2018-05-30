import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      authenticated: false,
      profile: null,
      role: ''
    },
    cart: null,
    importInProgress: false,
    importErrors: null,
    importedItems: null
  },
  getters: {
    isAuthenticated: state => {
      return state.user.authenticated
    },
    isAdminAuthenticated: state => {
      return state.user.authenticated && state.user.role === 'Admin'
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
    },
    isImportInProgress: state => {
      return state.importInProgress
    },
    importErrors: state => {
      return state.importErrors
    },
    importedItems: state => {
      return state.importedItems
    }
  },
  actions: {
    logIn ({ commit }, role) {
      commit('login', role)
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
    },
    startImport ({commit}) {
      commit('startImport')
    },
    endImport ({commit}, errors) {
      commit('endImport')
    },
    setImportErrors ({commit}, errors) {
      commit('setImportErrors', errors)
    },
    setImportedItems ({commit}, items) {
      commit('setImportedItems', items)
    }
  },
  mutations: {
    login (state, role) {
      state.user.authenticated = true
      state.user.role = role
    },
    logout (state) {
      state.user.authenticated = false
      state.user.role = ''
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
            cartItem.Count = newItem.Count
            break
          }
        }
      }
    },
    startImport (state) {
      state.importInProgress = true
    },
    endImport (state) {
      state.importInProgress = false
    },
    setImportErrors (state, errors) {
      state.importErrors = errors
    },
    setImportedItems (state, items) {
      console.log(items)
      state.importedItems = items
    }
  },
  plugins: [createPersistedState()]
})

export default store
