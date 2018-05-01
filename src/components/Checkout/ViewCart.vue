<template>
  <el-card class="gd_step_body" v-loading="loading">
    <cart-item
      class="gd_cart_item"
      v-for="item in items"
      :key="item.SKU"
      :item="item"
      v-on:updated="calculateSubtotal">
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
  props: {
    loading: { type: Boolean },
    items: { type: Array },
    subtotal: { type: Number }
  },
  components: {
    'cart-item': CartItem
  },
  methods: {
    calculateSubtotal () {
      this.$emit('updateSubtotal')
    }
  }
}
</script>

<style scoped>
  .gd_cart_item {
    margin-bottom: 20px;
  }
</style>
