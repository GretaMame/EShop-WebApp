<template>
  <el-main v-loading="loading" style="padding: 15px;">
    <el-card>
      <el-row v-if="items">
        <el-col class="gd-home-item-card" v-for="item in items" :key="item.SKU" :xs="12" :sm="8" :md="6" :lg="4">
          <div class="gd-clickable" @click="onItemClicked(item)">
            <ItemCard :item="item"></ItemCard>
          </div>
        </el-col>
      </el-row>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="pageOptions"
          :page-size="perPage"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalItems">
        </el-pagination>
    </el-card>
  </el-main>
</template>

<script>
import ItemCard from '@/components/ItemCard'
export default {
  data () {
    return {
      items: [],
      loading: false,
      perPage: 20,
      totalItems: 0,
      pageOptions: [20, 40, 100, 200],
      currentPage: 1
    }
  },
  components: {
    ItemCard
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
    fetchData () {
      this.loading = true

      var itemsCountPromise = this.axios.get(`odata/Items?$count=true&$top=0`)
      itemsCountPromise.then(response => {
        this.totalItems = response.data['@odata.count']
      }).catch(err => {
        console.log(err)
      })

      var itemsPromise = this.axios.get(`odata/Items?$expand=Attributes&$skip=${this.perPage * (this.currentPage - 1)}&$top=${this.perPage}`)
      itemsPromise.then(response => {
        this.items = response.data.value
      }).catch(err => console.log(err))

      Promise.all([itemsCountPromise, itemsPromise]).then(() => {
        this.loading = false
      }).catch((err) => {
        console.log(err)
        this.loading = false
      })
    },

    onItemClicked (item) {
      this.$router.push(`/itemdetails/${item.ID}`)
    }
  }
}
</script>
<style scoped>
  .gd-home-item-card {
    padding: 10px;
  }

  .gd-clickable:hover {
    cursor: pointer;
  }

</style>
