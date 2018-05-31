<template>
  <el-card class="gd_step_body" v-loading="loading">
    <cart-item
      class="gd_cart_item"
      v-for="item in cart.items"
      v-bind:key="item.sku"
      v-bind:item="item"
      v-bind:editable="true"
      v-on:updated="updateCartItem"
      v-on:delete="deleteCartItem">
    </cart-item>
    <h3><b>Subtotal:</b> {{(subtotal.toFixed(2))}} €</h3>
    <div class="gd_step_buttons">
      <el-button type="primary" @click="$emit('nextStep')">Checkout</el-button>
    </div>
  </el-card>
</template>

<script>
import CartItem from '@/components/Cart/CartItem'
import EventBus from '@/eventBus'

export default {
  data () {
    return {
      isUpdated: false,
      formName: 'ViewCart'
    }
  },
  beforeDestroy () {
    this.updateCart()
  },
  props: {
    cart: { type: Object },
    loading: { type: Boolean },
    subtotal: { type: Number }
  },
  components: {
    'cart-item': CartItem
  },
  methods: {
    calculateSubtotal () {
      this.$emit('updateSubtotal')
    },
    updateCartItem () {
      this.isUpdated = true
      this.calculateSubtotal()
    },
    deleteCartItem (id) {
      if (!this.$store.getters.isAuthenticated) {
        this.$store.dispatch('deleteItem', id)
        this.removeFromCart(id)
        this.calculateSubtotal()
      } else {
        this.axios.delete('Cart/deletecartitem/' + id).then(response => {
          this.removeFromCart(id)
          EventBus.$emit('updateCartCount')
          this.calculateSubtotal()
        }).catch(err => {
          console.log(err)
        })
      }
    },
    updateCart () {
      if (this.isUpdated !== true) {
        return
      }
      var itemsCount = []
      this.cart.items.forEach(item => {
        itemsCount.push({ ItemID: item.id, Count: item.count })
      })

      if (!this.$store.getters.isAuthenticated) {
        this.$store.dispatch('updateItems', itemsCount)
      } else {
        this.axios.put('Cart/updatecartitems', { items: itemsCount }).then(response => {
          this.isUpdated = false
          EventBus.$emit('updateCartCount')
        }).catch(err => {
          console.log(err)
        })
      }
    },
    removeFromCart (id) {
      for (var i = 0; i < this.cart.items.length; i++) {
        if (this.cart.items[i].id === id) {
          this.cart.items.splice(i, 1)
          break
        }
      }
    }
  }
}
</script>

<style scoped>
  .gd_cart_item {
    margin-bottom: 20px;
  }
  h3 {
    margin: 30px 0;
  }
</style>
