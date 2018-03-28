<template>
  <el-card class="box-card gd_wrapper">
    <h2>Order history</h2>
    <el-card
      class="box-card gd_order"
      v-for="order in orders"
      :key="order.orderNumber"
      v-loading="loading">
        {{order.orderNumber}}
    </el-card>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      orders: [
        {
          orderNumber: '1',
          user: '',
          createDate: '2017-03-27',
          orderStatus: 'Accepted',
          items: []
        },
        {
          orderNumber: '2',
          user: '',
          createDate: '2017-03-27',
          orderStatus: 'Accepted',
          items: []
        }
      ],
      loading: ''
    }
  },
  mounted () {
    this.loadOrders()
  },
  methods: {
    loadOrders () {
      /* axios GET */
    }
  }
}
</script>

<style scoped>
  .gd_order {
    padding: 10px;
    margin: 20px;
  }
  .gd_wrapper {
    margin: auto;
    max-width: 800px;
    margin-top: 40px;
    padding: 10px 50px;
  }
  h2 {
    margin: 20px;
    margin-bottom: 40px;
  }
</style>

