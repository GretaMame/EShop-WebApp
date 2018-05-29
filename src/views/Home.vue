<template>
  <el-row type="flex">
    <el-col :span="6" class="hidden-xs-only" v-loading="loadingFilters" v-if="categoryID">
      <h2>Filters</h2>
      <el-collapse class=gd-filters>
        <el-collapse-item class="gd-filterName" :title="attribute.name" v-for="attribute in filterAttributes" :key="attribute.id">
          <el-checkbox-group class="filterCheckBoxGroup" v-model="checkBoxesStates" @change="onFilterApplied">
              <el-checkbox class="filterCheckBox" :label="`${attribute.id}::${value.value}`" :disabled="loading"
                v-for="value in attribute.values" :key="value.value">{{`${value.value} (${value.count})`}}</el-checkbox>
          </el-checkbox-group>
        </el-collapse-item>
      </el-collapse>
    </el-col>
    <el-col>
      <el-card v-loading="loading" class="gd-card-border">
        <div v-if="categoryID && categoryName" class="gd-homeBread">
          <span v-if="subcategoryID" class="gd-clickable" @click="onCategoryClicked()"><b>{{categoryName}}</b></span>
          <span v-else>{{categoryName}}</span>
          <span v-if="subcategoryID">/ {{subcategoryName}}</span>
        </div>
        <div v-if="items && items[0]">
          <el-row>
            <el-col class="gd-home-item-card" v-for="item in items" :key="item.sku" :xs="24" :sm="12" :md="8" :lg="6">
              <div class="gd-clickable" @click="onItemClicked(item)">
                <ItemCard :item="item"></ItemCard>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="hidden-xs-only">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="pageOptions"
                :page-size="perPage"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalItems">
              </el-pagination>
            </el-col>
            <el-col class="hidden-sm-and-up">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="pageOptions"
                :page-size="perPage"
                small
                layout="total, sizes"
                :total="totalItems">
              </el-pagination>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="perPage"
                :pager-count="5"
                background
                small
                layout="prev, pager, next"
                :total="totalItems">
              </el-pagination>
            </el-col>
          </el-row>
        </div>
        <div v-if="items.length === 0 && !loading" class="gd-no-items">
          <icon name="folder-open-o" class="gd-folder-icon"/>
          <br>
          No items are currently available
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import EventBus from '@/eventBus'
import ItemCard from '@/components/Shared/ItemCard'
export default {
  props: ['categoryID', 'subcategoryID'],
  data () {
    return {
      items: [],
      loading: false,
      loadingFilters: false,
      perPage: 20,
      totalItems: 0,
      pageOptions: [10, 20, 40, 100, 200],
      currentPage: 1,
      categoryName: null,
      subcategoryName: null,
      filterAttributes: [],
      checkBoxesStates: []
    }
  },
  components: {
    ItemCard
  },
  created () {
    this.fetchData(true)
  },
  watch: {
    // call again the method if the route changes
    '$route': 'routeChanged'
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
    routeChanged () {
      this.checkBoxesStates = []
      this.fetchData(true)
    },
    fetchData (loadFilters) {
      this.loading = true
      this.items = []
      this.categoryName = null
      this.subcategoryName = null
      var filter = this.getCategoryFilter()

      if (this.categoryID) {
        EventBus.$emit('getNamesForBreadcrumb', {categoryID: this.categoryID, subcategoryID: this.subcategoryID}, this.setBreadcrumbNames)
      }

      let attrFilter = this.getFiltersFilter()
      if (filter && attrFilter) {
        filter += ` and ${attrFilter}`
      } else if (!filter && attrFilter) {
        filter = attrFilter
      }

      var itemsCountPromise = this.axios.get(`odata/Items?$count=true&$top=0${filter ? `&$filter=${filter}` : ''}`)
      itemsCountPromise.then(response => {
        this.totalItems = response.data['@odata.count']
      }).catch(err => {
        console.log(err)
      })

      var select = 'id,name,price,attributes&$expand=attributes,pictures($select=url)'
      var itemsPromise = this.axios.get(`odata/Items?$select=${select}&$skip=${this.perPage * (this.currentPage - 1)}&$top=${this.perPage}${filter ? `&$filter=${filter}` : ''}`)
      itemsPromise.then(response => {
        this.items = response.data.value
      }).catch(err => console.log(err))

      Promise.all([itemsCountPromise, itemsPromise]).then(() => {
        this.loading = false
      }).catch((err) => {
        console.log(err)
        this.loading = false
      })
      if (this.categoryID && loadFilters) {
        setTimeout(() => {
          this.filterAttributes = []
          this.loadingFilters = true
          this.axios.get(`odata/Items?$select=attributes&$expand=attributes&$filter=${this.getCategoryFilter()}`).then(response => {
            this.formatFilters(response)
            this.loadingFilters = false
            })
          .catch((err) => {
            this.loadingFilters = false
            console.log('no attributes for you ' + err)
          })
        }, 500)
      }
    },
    onCategoryClicked () {
      this.$router.push(`/home/${this.categoryID}`)
    },
    onItemClicked (item) {
      this.$router.push(`/itemdetails/${item.id}`)
    },
    setBreadcrumbNames (names) {
      if (names.categoryName) {
        this.categoryName = names.categoryName
      }
      if (names.subcategoryName) {
        this.subcategoryName = names.subcategoryName
      }
    },
    getFilterValue (value) {
      return `${value.value} (${value.count})`
    },
    formatFilters (response) {
      let items = response.data.value
      let attributes = []
      for (let item of items) {
        for (let attribute of item.attributes) {
          let existingAttribute = attributes.find((attr) => attr.id === attribute.attributeID)
          if (existingAttribute) {
            let currValues = existingAttribute.values
            let currValue = currValues.find((val) => val.value === attribute.value)
            if (currValue) {
              currValue.count++
            } else {
              currValues.push({
                value: attribute.value,
                count: 1
              })
            }
          } else {
            let newAttribute = {
              id: attribute.attributeID,
              name: attribute.name,
              values: [{value: attribute.value, count: 1}]
            }
            attributes.push(newAttribute)
          }
        }
      }
      this.filterAttributes = attributes
    },
    getFiltersFilter () {
      let filter = ''
      let attributes = []
      for (let i = 0; i < this.checkBoxesStates.length; i++) {
        let attrParts = this.checkBoxesStates[i].split('::')
        let id = attrParts[0]
        let value = attrParts[1]
        let existingAttribute = attributes.find(a => a.id === id)
        if (existingAttribute) {
          existingAttribute.values.push(value)
        } else {
          attributes.push({id: id, values: [value]})
        }
      }

      for (let i = 0; i < attributes.length; i++) {
        filter += `attributes/any(a: a/attributeID eq ${attributes[i].id} and (`
        for (let j = 0; j < attributes[i].values.length; j++) {
          filter += `a/value eq '${attributes[i].values[j].replace(/'/g, "''")}'`
          if ((j + 1) !== attributes[i].values.length) {
            filter += ' or '
          } else {
            filter += ')'
          }
        }
        filter += ')'
        if ((i + 1) !== attributes.length) {
          filter += ' and '
        }
      }
      return filter
    },
    getCategoryFilter () {
      let filter
      if (this.subcategoryID) {
        filter = `itemCategory/subCategory/id eq ${this.subcategoryID}`
      } else if (this.categoryID) {
        filter = `itemCategory/id eq ${this.categoryID}`
      }
      return filter
    },
    onFilterApplied (filters) {
      this.fetchData()
    }
  }
}
</script>
<style scoped>
  .gd-homeBread {
    font-size: 24px;
    padding-bottom: 20px;
    width: 100%;
    text-align: left;
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
  .gd-filters {
    min-height: 85vh;
    overflow-x: hidden;
    box-sizing: border-box;
    padding-left: 10px;
  }
  .el-checkbox.filterCheckBox {
    display: block;
    margin: 0;
  }
  .filterCheckBoxGroup {
    text-align: left;
  }
  .gd-filterName {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: none;
    max-width: 100%;
  }
</style>
