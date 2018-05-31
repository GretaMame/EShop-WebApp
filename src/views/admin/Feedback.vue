<template>
  <div class="feedback-table">
    <el-container v-loading="loading">
      <el-header>
        <el-row>
          <el-col :span="6">
            Rating:
            <el-select v-model="selectedRating" @change="fetchData()">
              <el-option
                v-for="rating in possibleRatings"
                :key="rating"
                :label="rating"
                :value="rating"/>
            </el-select>
          </el-col>
          <el-col :span="18">
            <el-input placeholder="Search" v-model="searchText">
              <el-select v-model="searchBy" slot="prepend" placeholder="Search by">
                <el-option label="Email" value="email"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click.native="fetchData()"></el-button>
            </el-input>
          </el-col>
        </el-row>
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
            prop="email"/>
          <el-table-column
            label="Rating"
            prop="rating">
            <template slot-scope="scope">
              <el-rate
                v-model="scope.row.rating"
                disabled
                text-color="#ff9900">
              </el-rate>
            </template>
          </el-table-column>
          <el-table-column
            label="Message"
            width="700px"
            prop="message"/>
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
      selectedRating: 'All',
      possibleRatings: ['All', '1', '2', '3', '4', '5'],
      loading: false,
      pageOptions: [5, 10, 25, 50],
      perPage: 10,
      currentPage: 1,
      filter: null,
      items: null,
      totalRows: 0,
      searchText: '',
      searchBy: 'email'
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
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    fetchData () {
      // build filter

      let filters = []

      if (this.selectedRating !== 'All') {
        filters.push('rating eq ' + this.selectedRating)
      }

      if (this.searchText) {
        filters.push(`contains(${this.searchBy},'${this.searchText}')`)
      }

      let filterText = filters.join('&')

      this.loading = true

      // get total rows for pagination (top=0 so no data is taken other than count)
      var rowsPromise = this.axios.get(`odata/AdminFeedback?$count=true&$top=0${filterText ? `&$filter=${filterText}` : ''}`)
      rowsPromise.then(response => {
        this.totalRows = response.data['@odata.count']
      }).catch(err => {
        console.log(err)
      })

      // get items of current page
      var itemsPromise = this.axios.get(`odata/AdminFeedback?$skip=${this.perPage * (this.currentPage - 1)}&$top=${this.perPage}${filterText ? `&$filter=${filterText}` : ''}`)
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
    }
  }
}
</script>
<style>
  .feedback-table{
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
</style>
