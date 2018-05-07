<template>
    <el-card v-loading="loading" class="gd-card-border">
      <el-breadcrumb v-if="categoryID && categoryName" class="gd-homeBread">
        <el-breadcrumb-item :to="`/home/${categoryID}`">
          {{categoryName}}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="subcategoryID && subcategoryName">
          {{subcategoryName}}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div v-if="items && items[0]"> 
        <el-row>
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
      </div>
      <div v-if="items.length === 0 && !loading" class="gd-no-items">
        <icon name="folder-open-o" class="gd-folder-icon"/>
        <br>
        No items are currently available
      </div>
    </el-card>
</template>

<script>
import EventBus from '@/eventBus'
import ItemCard from '@/components/ItemCard'
export default {
  props: ['categoryID', 'subcategoryID'],
  data () {
    return {
      items: [],
      loading: false,
      perPage: 20,
      totalItems: 0,
      pageOptions: [20, 40, 100, 200],
      currentPage: 1,
      categoryName: null,
      subcategoryName: null
    }
  },
  components: {
    ItemCard
  },
  created () {
    this.fetchData()
    EventBus.$on('setBreadcrumbNames', (names) => {
      console.log(names)
      if (names.categoryName) {
        this.categoryName = names.categoryName
      }
      if (names.subcategoryName) {
        this.subcategoryName = names.subcategoryName
      }
    })
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
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
      var filter
      if (this.subcategoryID) {
        filter = `ItemCategory/SubCategory/ID eq ${this.subcategoryID}`
      } else if (this.categoryID) {
        filter = `ItemCategory/ID eq ${this.categoryID}`
      }

      if (this.categoryID) {
        EventBus.$emit('getNamesForBreadcrumb', {categoryID: this.categoryID, subcategoryID: this.subcategoryID})
      }

      var itemsCountPromise = this.axios.get(`odata/Items?$count=true&$top=0${filter ? `&$filter=${filter}` : ''}`)
      itemsCountPromise.then(response => {
        this.totalItems = response.data['@odata.count']
      }).catch(err => {
        console.log(err)
      })

      var itemsPromise = this.axios.get(`odata/Items?$expand=Attributes,ItemCategory($expand=SubCategory)&$skip=${this.perPage * (this.currentPage - 1)}&$top=${this.perPage}${filter ? `&$filter=${filter}` : ''}`)
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
  .gd-homeBread {
    font-size: 24px;
    padding-bottom: 20px;
  }
  .gd-home-item-card {
    padding: 10px;
  }
  .gd-clickable:hover {
    cursor: pointer;
  }
  .gd-folder-icon{
    height: 50px;
    width: 50px;
  }
  .gd-no-items{
    position: relative;
    transform: translateY(200%);
    font-size: 18pt;
  }
  .gd-card-border{
    min-height: 85vh;
  }
</style>
