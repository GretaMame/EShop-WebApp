<template>
  <el-card class="gd_step_body" v-loading="loading">
    <cart-item
      class="gd_cart_item"
      v-for="item in cart.items"
      v-bind:key="item.sku"
      v-bind:item="item"
      v-on:updated="calculateSubtotal"
      v-on:delete="deleteCartItem">
    </cart-item>
    <h3><b>Subtotal:</b> {{(subtotal.toFixed(2))}} €</h3>
    <div class="gd_step_buttons">
      <el-button type="primary" @click="$emit('nextStep')">Next</el-button>
    </div>
  </el-card>
</template>

<script>
import CartItem from '@/components/CartItem.vue'
export default {
  data () {
    return {
      cart: []
    }
  },
  props: {
    loading: { type: Boolean },
    // items: { type: Array },
    subtotal: { type: Number }
  },
  components: {
    'cart-item': CartItem
  },
  created () {
    this.fetchData()
  },
  methods: {
    calculateSubtotal () {
      this.$emit('updateSubtotal')
    },
    fetchData () {
      //  this.loading = true

      this.axios.get(`Cart`).then(response => {
        this.cart = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    deleteCartItem (Id) {
      this.axios.delete('Cart/deletecartitem/' + Id).then(response => {
        for (var i = 0; i <= this.cart.items.length; i++) {
          if (this.cart.items[i].id === Id) {
            this.cart.items.splice(i, 1)
            break
          }
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  .gd_cart_item {
    margin-bottom: 20px;
  }
</style>
