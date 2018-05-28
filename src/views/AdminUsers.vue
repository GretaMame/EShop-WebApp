<template>
  <div class="users-table">
    <el-dialog
      :title="'Orders of ' + selectedUser.email"
      v-if="showUserDetails"
      :visible.sync="showUserDetails"
      width="70%">
      <el-container v-loading="userDetailsLoading" class="user-details-window">
        <el-main>
          <el-card
            class="gd_order"
            v-for="order in selectedUserOrders"
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
            </el-row>
            <el-collapse>
              <el-collapse-item>
                <template slot="title">
                  <span class="gd_label">{{countItems(order.items)}}</span>
                </template>
                <div v-for="item in order.items" :key="item.itemID" :item="item">
                <el-row class="gd_item_name_row">
                  <el-col :span="19">
                  {{item.name}}
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
        </el-main>
      </el-container>
    </el-dialog>
    <el-container v-loading="loading">
      <el-header>
        <el-input placeholder="Search" v-model="searchText">
          <el-select v-model="searchBy" slot="prepend" placeholder="Search by">
            <el-option label="Email" value="email"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click.native="fetchData()"></el-button>
        </el-input>
      </el-header>
      <el-main>
        <el-table
          class="table"
          :data="items"
          :stripe="true"
          size="medium"
          :fit="true"
          :header-cell-style="headerCellStyle()">
          <el-table-column
            label="Email"
            prop="email">
            <template slot-scope="scope">
              <el-button type="text" @click="showDetails(scope.row)">{{scope.row.email}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="Order count"
            prop="orderCount"/>
          <el-table-column
            label="Total money spent"
            prop="moneySpent"/>
          <el-table-column
            label="Average money spent"
            prop="averageMoneySpent"/>
          <el-table-column
            label="Role"
            prop="role"
            width="100px"/>
          <el-table-column
            fixed="right"
            label="Operations"
            width="140">
            <template slot-scope="scope">
              <el-dropdown>
                <span class="el-dropdown-link">
                  Change role<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item, index) in buildPossibleRoles(scope.row)"
                    :key="`item-${index}`"
                    @click.native="changeRole(scope.row,item)">
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
      perPage: 5,
      currentPage: 1,
      filter: null,
      items: null,
      totalRows: 0,
      searchText: '',
      searchBy: 'name',
      selectedUser: {},
      showUserDetails: false,
      userDetailsLoading: false,
      selectedUserOrders: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    countItems (items) {
      var length = items.length
      if (length === 1) return length + ' item'
      return length + ' items'
    },
    handleSizeChange (pageSize) {
      this.perPage = pageSize
      this.fetchData()
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.fetchData()
    },
    changeRole (user, role) {
      this.$confirm('This will change the user role. Continue?',
      {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'Warning'
      }).then(() => {
        this.loading = true

        this.axios.post('admin/users/changerole', {
          Role: role,
          Email: user.email
        })
        .then(() => this.fetchData())
        .catch((err) => {
          console.log(err)
          this.$notify.error({title: 'Error', message: 'Error encountered while changing role: ' + err.response.data.message})
          this.fetchData()
        })
      })
    },
    buildPossibleRoles (user) {
      var possibleValues = ['Admin', 'User', 'Blocked']

      return possibleValues.filter(val => val !== user.Role)
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
      var rowsPromise = this.axios.get(`odata/Users?$count=true&$top=0${filterText ? `&$filter=${filterText}` : ''}`)
      rowsPromise.then(response => {
        this.totalRows = response.data['@odata.count']
      }).catch(err => {
        console.log(err)
      })

      // get items of current page
      var itemsPromise = this.axios.get(`odata/Users?$skip=${this.perPage * (this.currentPage - 1)}&$top=${this.perPage}${filterText ? `&$filter=${filterText}` : ''}`)
      itemsPromise.then(response => {
        this.items = response.data.value
      }).catch(err => console.log(err))

      // wait for both promises to end
      Promise.all([rowsPromise, itemsPromise]).then(() => {
        this.loading = false
      }).catch((err) => {
        console.log(err)
        this.loading = false
      })
    },
    headerCellStyle () {
      return {
        'text-align': 'center'
      }
    },
    showDetails (user) {
      this.selectedUser = user
      this.showUserDetails = true
      this.loadUserDetails(user)
    },
    loadUserDetails (user) {
      this.userDetailsLoading = true

      this.axios.get(`admin/orders/single?email=${this.selectedUser.email}`)
        .then(response => {
          this.userDetailsLoading = false
          this.selectedUserOrders = response.data.result
        })
        .catch(err => {
          this.userDetailsLoading = false
          console.log(err)
          this.$notify.error({
            title: 'Error',
            message: 'Something went wrong while getting user orders' + err
          })
        })
    }
  }
}
</script>
<style>
  .users-table{
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
  .table {
    height: 70vh;
  }
  .user-details-window {
    height: 60vh;
  }
  .gd_order {
    max-width: 600px;
    margin: 20px auto;
    padding: 5px;
    text-align: left;
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
</style>
