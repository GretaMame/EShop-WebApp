<template>
  <el-card class="gd_wrapper">
    <h2>Order history</h2>
      <el-card
      class="gd_order"
      v-for="order in orders"
      :key="order.orderNumber"
      v-loading="loading"
      shadow="hover">
        <div slot="header" class="gd_order_header" align="left">
          <el-row>
            <el-col :span="8">
              <el-row>
                <span class="gd_label">Order no.:</span>
              </el-row>
              <el-row>
                {{order.orderNumber}}
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row>
                <span class="gd_label">Order date:</span>
              </el-row>
              <el-row>
                {{order.createDate}}
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row>
              <span class="gd_label">Order status:</span>
              </el-row>
              <el-row>
                {{order.status}}
              </el-row>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <span class="gd_label">Total: </span>
          {{order.totalPrice}}
          </el-row>
        <div v-for="item in order.items" :key="item.SKU" :item="item">
          <el-button @click="viewItem()">View item</el-button>
        </div>
      </el-card>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      orders: [],
      loading: ''
    }
  },
  mounted () {
    this.loadOrders()
  },
  methods: {
    loadOrders () {
      /* axios GET */
      this.orders = [
        {
          orderNumber: '12312412',
          user: '',
          createDate: '2017-03-27',
          status: 'Accepted',
          items: [
            {
              item: {
                SKU: '12134123',
                Name: 'Men\'s jacket Rahfa',
                Image: 'https://style24.lt/image/cache/data/products/82/vyriskas-megztinis-rahfa-39052-750x750.jpg',
                Price: 37.95,
                Count: 1,
                CreateDate: '2018-03-17 15:00',
                Attributes: [{Name: 'Color', Value: 'blue'}, {Name: 'Style', Value: 'casual'}]
              },
              count: 2,
              price: 15.95
            }
          ],
          deliveryAddress: {},
          totalPrice: 598.98
        },
        {
          orderNumber: '21342322',
          user: '',
          createDate: '2017-03-27',
          status: 'Accepted',
          items: [],
          deliveryAddress: {},
          totalPrice: 45.78
        }
      ]
    },
    viewItem () {

    }
  }
}
</script>

<style scoped>
  .gd_order {
    max-width: 600px;;
    margin: 20px auto;
    padding: 5px;
  }
  .gd_wrapper {
    margin: auto;
    max-width: 700px;
    margin-top: 40px;
  }
  h2 {
    margin: 20px 0;
  }
  .gd_label {
    font-weight: bold;
    margin: 5px 0;
    display: inline-block;
  }
</style>

