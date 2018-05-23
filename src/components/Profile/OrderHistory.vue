<template>
  <el-card class="gd_wrapper" v-loading="loading">
    <h2>Order history</h2>
    <el-card
      class="gd_order"
      v-for="order in orders"
      :key="order.id"
      shadow="hover">
        <div slot="header" class="gd_order_header" align="left">
          <el-row>
            <el-col :span="14">
              <el-row>
                <span class="gd_label">Order no.:</span>
              </el-row>
              <el-row>
                {{order.orderNumber}}
              </el-row>
            </el-col>
            <el-col :span="5">
              <el-row>
                <span class="gd_label">Order date:</span>
              </el-row>
              <el-row>
                {{order.createDate}}
              </el-row>
            </el-col>
            <el-col :span="5">
              <el-row>
              <span class="gd_label">Order status:</span>
              </el-row>
              <el-row>
                {{order.status}}
              </el-row>
            </el-col>
          </el-row>
        </div>
        <el-row class="gd_line_bottom_margin">
          <el-col :span="18">
          <span class="gd_label">Total: </span>
          {{order.totalPrice.toFixed(2)}} €
          </el-col>
          <el-col :span="6">
            <el-button size="small" @click="addItemsToCart(order.items)" align="right">
              Add all items to cart
            </el-button>
          </el-col>
        </el-row>
        <el-collapse>
          <el-collapse-item>
            <template slot="title">
              <span class="gd_label">{{countItems(order.items)}}</span>
            </template>
            <div v-for="item in order.items" :key="item.itemID" :item="item">
            <el-row class="gd_item_name_row">
              <el-col :span="19">
              {{item.Name}}
              </el-col>
              <el-col :span="5" align="right">
                <el-tooltip
                  placement="top"
                  content="View item"
                  effect="dark">
                  <el-button
                    icon="el-icon-search"
                    @click="viewItemDetails(item.itemID)"
                    size ="small"
                    circle>
                  </el-button>
                </el-tooltip>
                <el-tooltip
                  placement="top"
                  content="Add to cart"
                  effect="dark">
                    <el-button
                      icon="el-icon-goods"
                      @click="addItemToCart(item.itemID)"
                      size ="small"
                      circle>
                    </el-button>
                </el-tooltip>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <span class="gd_label gd_gray_text">Unit price:</span>
              </el-col>
              <el-col :span="4">
                <span class="gd_gray_text">{{item.price.toFixed(2)}} €</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <span class="gd_label gd_gray_text">Quantity:</span>
              </el-col>
              <el-col :span="4">
                <span class="gd_gray_text">{{item.count}}</span>
              </el-col>
            </el-row>
            </div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              <span class="gd_label">Delivery address</span>
            </template>
            <div class="gd_gray_text">
              <el-row>{{order.deliveryAddress.Name}} {{order.deliveryAddress.Surname}}</el-row>
              <el-row>{{order.deliveryAddress.Street}}</el-row>
              <el-row>{{order.deliveryAddress.City}}</el-row>
              <el-row>{{order.deliveryAddress.Country}} {{order.deliveryAddress.Postcode}}</el-row>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="pageOptions"
        :page-size="perPage"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalOrders">
      </el-pagination>
  </el-card>
</template>

<script>
import EventBus from '@/eventBus'
export default {
  data () {
    return {
      orders: [],
      loading: '',
      itemsText: 'items',
      perPage: 20,
      totalOrders: 0,
      pageOptions: [5, 10, 15, 20],
      currentPage: 1
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    countItems (items) {
      var length = items.length
      if (length === 1) return length + ' item'
      return length + ' items'
    },
    viewItemDetails (id) {
      this.$router.push({name: 'itemdetails', params: {id: id}})
    },
    handleSizeChange (pageSize) {
      this.perPage = pageSize
      this.fetchData()
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.fetchData()
    },
    fetchData () {
      this.loading = true

      var ordersCountPromise = this.axios.get(`odata/Orders?$count=true&$top=0`)
      ordersCountPromise.then(response => {
        this.totalOrders = response.data['@odata.count']
      })

      var ordersPromise = this.axios.get(`odata/Orders?$expand=items&$skip=${this.perPage * (this.currentPage - 1)}&$top=${this.perPage}&$orderby=createDate desc`)
      ordersPromise.then(response => {
        this.orders = response.data.value
        this.parseAddressesToObjects()
      })

      Promise.all([ordersCountPromise, ordersPromise]).then(() => {
        this.loading = false
      }).catch(this.handleError)
    },
    parseAddressesToObjects () {
      var length = this.orders.length
      for (var i = 0; i < length; i++) {
        this.orders[i].deliveryAddress = JSON.parse(this.orders[i].deliveryAddress)
      }
    },
    addItemsToCart (items) {
      if (items === null) return
      var itemsList = []
      for (var i = 0; i < items.length; i++) {
        itemsList.push({ItemID: items[i].ItemID, Count: 1})
      }
      this.loading = true
      this.axios.post('cart', {Items: itemsList})
        .then(() => {
          this.loading = false
          this.$notify.success({
            title: 'Success',
            message: 'Items were added to cart.'
          })
        })
        .catch(this.handleError)
    },
    addItemToCart (id) {
      this.loading = true
      var newItem = {
        ItemID: id,
        Count: 1
      }
      this.axios.put(`cart`, newItem).then(() => {
        this.loading = false
        this.$notify.success({
          title: 'Success',
          message: 'Item was added to cart.'
        })
      })
      .catch(this.handleError)
    },
    handleError (err) {
      this.loading = false
      if (err.cookieExpired) {
        EventBus.$emit('cookieExpired')
        return
      }
      console.log(err)
      this.$notify.error({
        title: 'Error',
        message: 'Ups! Something bad happened.'
      })
    }
  }
}
</script>

<style scoped>
  .el-card__header {
    padding: 0px !important;
    background-color:#F5F5F5;
  }
  .gd_order {
    max-width: 600px;;
    margin: 20px auto;
    padding: 5px;
    text-align: left;
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
  }
  .gd_gray_text {
    color: gray;
  }
  .gd_line_bottom_margin {
    margin-bottom: 10px;
  }
  .gd_item_name_row {
    border-top: 1px solid lightgray;
    padding-top: 5px;
    color: #DF3A01;
  }
  .el-button {
    margin-left: 1px;
  }
</style>

