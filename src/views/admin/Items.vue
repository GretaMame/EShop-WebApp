<template>
  <div class="items-table">
    <el-container v-loading="loading">
      <el-header>
        <el-row>
          <el-col :span="5" :xl="2">
            <router-link :to="{ name: 'adminItemsAdd' }">
              <el-button>Add new item</el-button>
            </router-link>
          </el-col>
          <el-col :span="5" :xl="2">
            <el-button :disabled="selectedItems.length === 0" type="danger" @click="deleteSelected">Archive selected</el-button>
          </el-col>
          <el-col :span="8" :xl="14">
            <el-input placeholder="Search" v-model="searchText">
              <el-select v-model="searchBy" slot="prepend" placeholder="Search by">
                <el-option label="Name" value="name"></el-option>
                <el-option label="SKU" value="sku"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="fetchData()"></el-button>
            </el-input>
          </el-col>
          <el-col :span="6">
            <ExportButton />
          </el-col>
        </el-row>
      </el-header>
      <el-main class="table-div">
        <el-table
          ref="itemTable"
          :data="items"
          :stripe="true"
          size="medium"
          :fit="true"
          :header-cell-style="headerCellStyle()"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="SKU"
            prop="sku"
            width="100px"/>
          <el-table-column
            label="Name"
            prop="name"
            width="300px"/>
          <el-table-column
            label="Description"
            prop="description">
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                title="Description"
                width="400"
                trigger="hover"
                :content="scope.row.description">
                <div slot="reference" class="description-cell" >
                  {{scope.row.description}}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="Price" prop="price" width="100px">
                    <template slot-scope="scope">
              {{scope.row.price}} €
            </template>
          </el-table-column>
          <el-table-column label="Category" prop="category" width="130px" />
          <el-table-column
            label="Archived"
            prop="isDeleted"
            width="80px">
            <template slot-scope="scope">
              {{ scope.row.isDeleted ? 'Yes' : 'No' }}
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="Operations"
            width="120"
            class="table-actions">
            <template slot-scope="scope">
              <router-link :to="{ name: 'adminItemsEdit', params: {itemid: scope.row.id} }">
                <el-button class="table-action-button" type="text" size="small">Edit item</el-button>
              </router-link>
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
import ExportButton from '@/components/ExportComponent'
export default {
  components: {
    ExportButton
  },
  data () {
    return {
      loading: false,
      pageOptions: [5, 10, 25, 50],
      perPage: 10,
      currentPage: 1,
      filter: null,
      items: [],
      totalRows: 1,
      searchText: '',
      searchBy: 'Name',
      selectedItems: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    showModal () {
      this.showAddItemModal = true
    },
    handleSizeChange (pageSize) {
      this.perPage = pageSize
      this.fetchData()
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.fetchData()
    },
    handleSelectionChange (val) {
      this.selectedItems = val
    },
    deleteSelected () {
      if (this.selectedItems.length === 0) {
        return
      }

      this.$confirm('Are you sure you want to delete selected items?',
      {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'Warning'
      }).then(() => {
        this.loading = true
        let idsToArchive = this.selectedItems.map(x => x.id)
        this.axios.post('admin/Items/archive', idsToArchive)
          .then(() => {
            this.loading = false
            this.fetchData()
          })
          .catch(err => {
            this.loading = false
            console.log(err)
            this.$notify.error({
              title: 'Error',
              message: 'There was a problem while archiving the items: ' + err,
          offset: 50
            })
          })
      })
    },
    headerCellStyle () {
      return {
        'text-align': 'center'
      }
    },
    fetchData () {
      this.loading = true
      // build filter

      let filters = []

      if (this.searchText) {
        filters.push(`contains(${this.searchBy},'${this.searchText}')`)
      }

      let filterText = filters.join('&')

      this.loading = true

      // get total rows for pagination (top=0 so no data is taken other than count)
      var rowsPromise = this.axios.get(`odata/AdminItems?$count=true&$top=0${filterText ? `&$filter=${filterText}` : ''}`)
      rowsPromise.then(response => {
        this.totalRows = response.data['@odata.count']
      }).catch(err => {
        console.log(err)
      })

      // get items of current page
      var itemsPromise = this.axios.get(`odata/AdminItems?$skip=${this.perPage * (this.currentPage - 1)}&$top=${this.perPage}${filterText ? `&$filter=${filterText}` : ''}`)
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
    }
  }
}
</script>
<style scoped>
  .items-table{
    padding: 16px 0 0 0;
    display: flex;
  }
  .table-div {
    height: 80vh;
  }
  .table-action-button{
    margin: 0 auto 0 auto;
    padding-top: 0;
    padding-bottom: 0;
  }
  .table-actions{
    padding-top:4px;
    padding-bottom: 4px;
  }
  .description-cell{
    overflow: hidden;
    line-height: 1.2em;
    height: 3.6em;
    text-align: left;
    font-size: 10pt;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
</style>
