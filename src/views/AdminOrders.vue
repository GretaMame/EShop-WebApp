<template>
  <div class="orders-table">
    <el-dialog
      :title="'Order data: ' + openOrder.orderNumber"
      v-if="orderDataVisible"
      :visible.sync="orderDataVisible"
      width="60%">
      <el-container v-loading="orderDataLoading">
        <el-header>
          <div class="delivery-address">{{buildDeliveryAddress()}}</div>
        </el-header>
        <el-main class="dialog-main">
          <el-table
            class="table"
            :data="openOrder.items"
            :stripe="true"
            size="medium"
            :fit="true"
            :header-cell-style="() => { return {'text-align': 'center'} }">
            <el-table-column
              label="SKU"
              prop="item.sku"/>
            <el-table-column
              label="Name"
              prop="item.name"/>
            <el-table-column
              label="Price"
              prop="price"/>
            <el-table-column
              label="Count"
              prop="count"/>
          </el-table>
        </el-main>
      </el-container>
    </el-dialog>
    <el-container v-loading="loading">
      <el-header>
        <el-input placeholder="Search" v-model="searchText">
          <el-select v-model="searchBy" slot="prepend" placeholder="Search by">
            <el-option label="Email" value="userEmail"></el-option>
            <el-option label="Order No." value="orderNumber"></el-option>
            <el-option label="Status" value="status"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click.native="fetchData()"></el-button>
        </el-input>
      </el-header>
      <el-main class="table-div">
        <el-table
          class="table"
          :data="items"
          :stripe="true"
          size="medium"
          :fit="true"
          :header-cell-style="() => { return {'text-align': 'center'} }">
          <el-table-column
            label="Order no."
            prop="orderNumber">
            <template slot-scope="scope">
              <el-button type="text" @click="openData(scope.row)">{{scope.row.orderNumber}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="Email"
            prop="userEmail"/>
          <el-table-column
            label="Name"
            prop="name"/>
          <el-table-column
            label="Price"
            prop="totalPrice"/>
          <el-table-column
            label="Status"
            prop="status"
            width="100px"/>
          <el-table-column
            fixed="right"
            label="Operations"
            width="140">
            <template slot-scope="scope">
              <el-dropdown>
                <span class="el-dropdown-link">
                  Change status<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item, index) in buildPossibleStatus(scope.row)"
                    :key="`item-${index}`"
                    @click.native="changeStatus(scope.row,item)">
                    {{ item }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="pageOptions"
          :page-size="perPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRows">
        </el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default{
  data () {
    return {
      loading: false,
      pageOptions: [5, 10, 25, 50],
      perPage: 10,
      currentPage: 1,
      filter: null,
      items: null,
      totalRows: 0,
      searchText: '',
      searchBy: 'userEmail',
      orderDataVisible: false,
      orderDataLoading: false,
      openOrder: {
        deliveryAddress: {},
        items: [],
        totalPrice: 0
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    handleSizeChange (pageSize) {
      this.perPage = pageSize
      this.fetchData()
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.fetchData()
    },
    changeStatus (order, status) {
      this.$confirm('This will change the order status. Continue?',
      {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'Warning'
      }).then(() => {
        this.loading = true

        this.axios.post('admin/orders/changestatus', {
          id: order.id,
          status: status
        })
        .then(() => this.fetchData())
        .catch((err) => {
          console.log(err)
          this.$notify.error({title: 'Error', message: 'Error encountered while changing status: ' + err.response.data.message})
          this.fetchData()
        })
      })
    },
    buildPossibleStatus (order) {
      var possibleValues = ['Accepted', 'Processing', 'Sent', 'Delivered']

      return possibleValues.filter(val => val !== order.status)
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    fetchData () {
      // build filter

      let filters = []

      if (this.searchText) {
        filters.push(`contains(${this.searchBy},'${this.searchText}')`)
      }

      let filterText = filters.join('&')

      this.loading = true

      // get total rows for pagination (top=0 so no data is taken other than count)
      var rowsPromise = this.axios.get(`odata/AdminOrders?$count=true&$top=0${filterText ? `&$filter=${filterText}` : ''}`)
      rowsPromise.then(response => {
        this.totalRows = response.data['@odata.count']
      }).catch(err => {
        console.log(err)
      })

      // get items of current page
      var itemsPromise = this.axios.get(`odata/AdminOrders?$skip=${this.perPage * (this.currentPage - 1)}&$top=${this.perPage}${filterText ? `&$filter=${filterText}` : ''}`)
      itemsPromise.then(response => {
        this.items = response.data.value

        for (let item of this.items) {
          item.deliveryAddress = JSON.parse(item.deliveryAddress)
          item.name = [item.deliveryAddress.Name, item.deliveryAddress.Surname].join(' ')
        }
      }).catch(err => console.log(err))

      // wait for both promises to end
      Promise.all([rowsPromise, itemsPromise]).then(() => {
        this.loading = false
      }).catch((err) => {
        console.log(err)
        this.loading = false
      })
    },
    openData (order) {
      this.loadOrderData(order)
      this.orderDataVisible = true
    },
    loadOrderData (order) {
      this.orderDataLoading = true

      this.axios.get('admin/orders/details?id=' + order.id)
        .then(response => {
          this.orderDataLoading = false

          this.openOrder = response.data
          this.openOrder.deliveryAddress = JSON.parse(this.openOrder.deliveryAddress)
        })
        .catch(err => {
          this.orderDataLoading = false
          console.log(err)
          this.$notify.error({
            title: 'Error',
            message: 'Something bad happened while loading order data: ' + err
          })
        })
    },
    buildDeliveryAddress () {
      if (!this.openOrder || !this.openOrder.deliveryAddress || this.orderDataLoading) {
        return ''
      }

      let deliveryAddress = this.openOrder.deliveryAddress

      return `${deliveryAddress.Name} ${deliveryAddress.Surname}\n${deliveryAddress.Street}\n${deliveryAddress.Postcode} ${deliveryAddress.City}\n${deliveryAddress.Country}`
    }
  }
}
</script>
<style>
  .orders-table{
    padding: 16px 0 0 0;
    display: flex;
  }
  .table-action-button{
    margin: 0 auto 0 auto
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-select {
    width: 120px;
  }
  .table-div {
    height: 80vh;
  }
  .dialog-main {
    height: 50vh;
  }
  .delivery-address {
    white-space: pre-line;
    line-height: 16px;
    height: 50px;
  }
</style>
