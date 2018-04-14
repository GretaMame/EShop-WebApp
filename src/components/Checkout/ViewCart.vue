<template>
  <el-card class="gd_step_body" v-loading="loading">
    <cart-item class="gd_cart_item" v-for="item in items" :key="item.SKU" :item="item"></cart-item>
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
    }
  },
  mounted () {
    console.log(this.items)
  },
  methods: {

  }
}
</script>

<style scoped>
  .gd_cart_item {
    margin-bottom: 20px;
  }
</style>
