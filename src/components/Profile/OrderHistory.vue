<template>
  <el-card class="gd_wrapper">
    <h2>Order history</h2>
    <el-card
      class="gd_order"
      v-for="order in orders"
      :key="order.ID"
      v-loading="loading"
      shadow="hover">
        <div slot="header" class="gd_order_header" align="left">
          <el-row>
            <el-col :span="14">
              <el-row>
                <span class="gd_label">Order no.:</span>
              </el-row>
              <el-row>
                {{order.OrderNumber}}
              </el-row>
            </el-col>
            <el-col :span="5">
              <el-row>
                <span class="gd_label">Order date:</span>
              </el-row>
              <el-row>
                {{order.CreateDate}}
              </el-row>
            </el-col>
            <el-col :span="5">
              <el-row>
              <span class="gd_label">Order status:</span>
              </el-row>
              <el-row>
                {{order.Status}}
              </el-row>
            </el-col>
          </el-row>
        </div>
        <el-row class="gd_line_bottom_margin">
          <el-col :span="18">
          <span class="gd_label">Total: </span>
          {{order.TotalPrice.toFixed(2)}} €
          </el-col>
          <el-col :span="6">
            <el-button size="small" @click="addItemsToCart(order.Items)" align="right">
              Add all items to cart
            </el-button>
          </el-col>
        </el-row>
        <el-collapse>
          <el-collapse-item>
            <template slot="title">
              <span class="gd_label">{{countItems(order.Items)}}</span>
            </template>
            <div v-for="item in order.Items" :key="item.ItemID" :item="item">
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
                    @click="viewItemDetails(item.ItemID)"
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
                      @click="addItemToCart(item.ItemID)"
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
                <span class="gd_gray_text">{{item.Price.toFixed(2)}} €</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <span class="gd_label gd_gray_text">Quantity:</span>
              </el-col>
              <el-col :span="4">
                <span class="gd_gray_text">{{item.Count}}</span>
              </el-col>
            </el-row>
            </div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              <span class="gd_label">Delivery address</span>
            </template>
            <div class="gd_gray_text">
              <el-row>{{order.DeliveryAddress.Name}} {{order.DeliveryAddress.Surname}}</el-row>
              <el-row>{{order.DeliveryAddress.Street}}</el-row>
              <el-row>{{order.DeliveryAddress.City}}</el-row>
              <el-row>{{order.DeliveryAddress.Country}} {{order.DeliveryAddress.Postcode}}</el-row>
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
export default {
  data () {
    return {
      orders: [],
      loading: '',
      itemsText: 'items',
      perPage: 20,
      totalOrders: 0,
      pageOptions: [20, 40, 100, 200],
      currentPage: 1
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    loadOrders () {
      /* axios GET */
      this.orders = [
        {
          id: 1,
          user: '',
          createDate: '2017-03-27',
          status: 'Accepted',
          items: [
              {
                id: '',
                itemId: '1',
                sku: '1241241',
                name: 'Men\'s jacket Rahfa',
                price: 37.95,
                count: 1
              },
              {
                itemId: '2',
                sku: '3465456',
                name: '50pcs T5577 EM4305 Copy Rewritable Writable Rewrite Duplicate RFID Tag Can Copy EM4100 125khz card Proximity Token Keyfobs',
                price: 37.95,
                count: 3
              },
              {
                itemId: '17',
                sku: '12352345',
                name: 'Men\'s jacket Rahfa',
                price: 37.95,
                count: 4
              }
          ],
          deliveryAddress: {
            name: 'Greta',
            surname: 'Grietine',
            street: 'Koldunciku 27',
            city: 'Utena',
            postcode: '28176',
            country: 'Lietuva'
          },
          totalPrice: 598.98
        },
        {
          orderNumber: '21342322',
          user: '',
          createDate: '2017-03-27',
          status: 'Accepted',
          items: [],
          deliveryAddress: {
            name: 'Greta',
            surname: 'Grietine',
            street: 'Koldunciku 27',
            city: 'Utena',
            postcode: '28176',
            country: 'Lietuva'
          },
          totalPrice: 45.78
        }
      ]
    },
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
      this.fetchOrders()
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.fetchOrders()
    },
    fetchData () {
      this.loading = true

      var ordersCountPromise = this.axios.get(`odata/Orders?$count=true&$top=0`)
      ordersCountPromise.then(response => {
        this.totalOrders = response.data['@odata.count']
        console.log('Total orders:' + this.totalOrders)
      }).catch(err => {
        console.log(err)
      })

      var ordersPromise = this.axios.get(`odata/Orders?$expand=Items&$skip=${this.perPage * (this.currentPage - 1)}&$top=${this.perPage}`)
      ordersPromise.then(response => {
        this.orders = response.data.value
        this.parseAddressesToObjects()
      }).catch(err => console.log(err))

      Promise.all([ordersCountPromise, ordersPromise]).then(() => {
        this.loading = false
      }).catch((err) => {
        console.log(err)
        this.loading = false
      })
    },
    parseAddressesToObjects () {
      var length = this.orders.length
      for (var i = 0; i < length; i++) {
        this.orders[i].DeliveryAddress = JSON.parse(this.orders[i].DeliveryAddress)
      }
    },
    addItemsToCart (items) {
      if (items === null) return
      // var itemsList
      for (var i = 0; i < items.length; i++) {
        this.addItemsToCart(items[i].itemId)
        // itemsList.push({ItemID: (items[i].itemId), Count: 1})
      }
      // var addPromise = null
      // if (this.$store.getters.isAuthenticated) {
      //   addPromise = this.addToCartRemote(newItem)
      // } else {
      //   addPromise = this.addToCartLocal(newItem)
      // }
    },
    addItemToCart (id) {
      var newItem = {
        ItemID: id,
        Count: 1
      }
      var addPromise = null
      if (this.$store.getters.isAuthenticated) {
        addPromise = this.addToCartRemote(newItem)
      } else {
        addPromise = this.addToCartLocal(newItem)
      }

      addPromise.then(() => {
        this.$notify.success({
          title: 'Success',
          message: 'Item was added to cart.'
        })
      })
      .catch(err => {
        // try again if cookie expired, so items will be added to local storage cart
        if (err.cookieExpired) {
          this.addItemToCart(id)
          return
        }
        console.log(err)
        this.$notify.error({
          title: 'Error',
          message: 'Ups! Something bad happened.'
        })
      })
    },
    addToCartLocal (item) {
      return new Promise((resolve) => {
        this.$store.dispatch('addItemToCart', item)
        resolve()
      })
    },
    addToCartRemote (item) {
      return this.axios.put(`cart`, item)
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

