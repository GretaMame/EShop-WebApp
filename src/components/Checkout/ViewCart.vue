<template>
  <el-card class="gd_step_body" v-loading="loading">
    <cart-item
      class="gd_cart_item"
      v-for="item in items"
      :key="item.SKU"
      :item="item"
      v-on:updated="calculateSubtotal">
    </cart-item>
    <h3><b>Subtotal:</b> {{(subtotal)}}</h3>
  </el-card>
</template>

<script>
import CartItem from '@/components/CartItem.vue'
export default {
  props: {
    loading: { type: Boolean },
    items: { type: Array }
  },
  components: {
    'cart-item': CartItem
  },
  data () {
    return {
      subtotal: 0
    }
  },
  mounted () {
    this.calculateSubtotal()
  },
  methods: {
    calculateSubtotal () {
      var arrayLength = this.items.length
      this.subtotal = 0
      for (var i = 0; i < arrayLength; i++) {
        this.subtotal += this.items[i].Price * this.items[i].Count
      }
      this.subtotal = this.subtotal.toFixed(2)
    }
  }
}
</script>

<style scoped>
  .gd_cart_item {
    margin-bottom: 20px;
  }
</style>
