<template>
  <div class="discount-table">
    <el-container v-loading="loading">
      <el-row>
        <el-col :span="5">
          <router-link :to="{ name: 'adminDiscountAdd' }">
            <el-button>Add new discount</el-button>
          </router-link>
        </el-col>
      </el-row>
      <el-main class="table-div">
        <el-table
          :data="discounts"
          :stripe="true"
          size="medium"
          :fit="true"
          :header-cell-style="headerCellStyle()">
          <el-table-column
            width="50">
            <template slot-scope="scope">
              <el-button icon="el-icon-delete" circle size="mini" @click="deleteDiscount(scope.$index)"></el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="Category"
            width="150px"
            prop="categoryName"/>
          <el-table-column
            label="Subcategory"
            width="150px"
            prop="subCategoryName"/>
          <el-table-column
            label="Item name"
            prop="itemName"/>
          <el-table-column
            label="Discount description"
            prop="name"/>
          <el-table-column
            label="Discount"
            width="80px"
            prop="value"/>
          <el-table-column
            label="Valid until"
            width="150px"
            prop="to"/>
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
      discounts: [],
      totalRows: 0
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
    deleteDiscount (index) {
      this.$confirm('Are you sure you want to delete selected discounts?',
      {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'Warning'
      }).then(() => {
        this.loading = true
        this.axios.delete('admin/discount/' + this.discounts[index].id)
          .then(() => {
            this.loading = false
            this.fetchData()
          })
          .catch(err => {
            this.loading = false
            this.$notify.error({
              title: 'Error',
              message: err.response.data.message,
              offset: 50
            })
          })
      })
    },
    fetchData () {
      this.loading = true

      // get total rows for pagination (top=0 so no data is taken other than count)
      var rowsPromise = this.axios.get(`odata/Discount?$count=true&$top=0`)
      rowsPromise.then(response => {
        this.totalRows = response.data['@odata.count']
      })

      // get discounts of current page
      var discountsPromise = this.axios.get(`odata/Discount?$skip=${this.perPage * (this.currentPage - 1)}&$top=${this.perPage}`)
      discountsPromise.then(response => {
        this.discounts = response.data.value
      })

      // wait for both promises to end
      Promise.all([rowsPromise, discountsPromise]).then(() => {
        this.checkValue()
        this.loading = false
      }).catch((err) => {
        this.loading = false
        this.$notify.error({
          title: 'Error',
          message: err.response.data.message,
          offset: 50
        })
      })
    },
    checkValue () {
      if (this.discounts != null || this.discounts.length === 0) {
        for (var i = 0; i < this.discounts.length; i++) {
          if (this.discounts[i].isPercentages) {
            this.discounts[i].value = this.discounts[i].value + ' %'
          } else {
            this.discounts[i].value = this.discounts[i].value + ' €'
          }
        }
      }
    },
    headerCellStyle () {
      return {
        'text-align': 'center'
      }
    }
  }
}
</script>
<style scoped>
  .discount-table{
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
</style>
