<template>
  <div class="export-container">
    <div>
      <el-cascader @blur="left" :disabled="exportStarted" v-model="exportCategoryObj" placeholder="Select Category/Subcategory"
        class="select-class" v-loading="categoriesLoading" :options="options" change-on-select></el-cascader>
      <div v-if="noCategorySelected" class="gd-err-msg">
        Select category or subcategory first.
      </div>
    </div>
    <el-tooltip :disabled="exportStarted" placement="bottom" content="Export selected" effect="dark">
      <div class="wrapper for chrome">
        <img class="exel-img" :class="{'disabled': exportStarted}" src="@/../static/export/excel.svg" @click="startExport" alt="Export">
      </div>
    </el-tooltip>
  </div>
</template>
<script>
  import EventBus from '@/eventBus'
  export default {
    data () {
      return {
        exportStarted: false,
        categories: null,
        categoriesLoading: false,
        options: [],
        exportCategoryObj: null,
        noCategorySelected: false
      }
    },
    methods: {
      startExport () {
        if (this.exportStarted) {
          return
        }
        if (!this.exportCategoryObj || !this.exportCategoryObj.length) {
          this.noCategorySelected = true
          return
        }
        EventBus.$emit('exportStarted')
        if (this.exportCategoryObj.length > 1) { // export subcategory
          var subcategoryId = this.exportCategoryObj[1]
          this.exportSubCategory(subcategoryId)
          return
        }
        var categoryId = this.exportCategoryObj[0]
        if (categoryId === -1) { // export all
          this.exportAllCategories()
          return
        }
        this.exportCategory(categoryId) // export category
      },
      exportAllCategories () {
        this.exportStarted = true
        this.$notify.info({
          title: 'Export started',
          message: 'Once export file be ready, file download start automatically.',
          offset: 50
        })
        this.axios.get('admin/items/exportAll').then((response) => {
          EventBus.$emit('exportFinished')
          this.generateDownload(response.data)
          this.exportStarted = false
        }).catch(e => {
          EventBus.$emit('exportFinished')
          this.exportStarted = false
          this.$notify.error({
            title: 'Error',
            message: 'Failed to export items.',
            offset: 50
          })
        })
      },
      exportCategory (categoryId) {
        this.exportStarted = true
        this.$notify.info({
          title: 'Export started',
          message: 'Once export file be ready, file download start automatically.',
          offset: 50
        })
        this.axios.get('admin/items/export/' + categoryId).then((response) => {
          EventBus.$emit('exportFinished')
          this.generateDownload(response.data)
          this.exportStarted = false
        }).catch(e => {
          this.exportStarted = false
          EventBus.$emit('exportFinished')
          if (e.response.status === 400) {
            this.$notify.warning({
              title: 'Warning',
              message: 'No item were found for this category.',
              offset: 50
            })
          } else {
            this.$notify.error({
              title: 'Error',
              message: 'Failed to export items.',
              offset: 50
            })
          }
        })
      },
      exportSubCategory (subcategoryId) {
        this.exportStarted = true
        this.$notify.info({
          title: 'Export started',
          message: 'Once export file be ready, file download start automatically.'
        })
        this.axios.get('admin/items/export/subcategory/' + subcategoryId).then((response) => {
          EventBus.$emit('exportFinished')
          this.generateDownload(response.data)
          this.exportStarted = false
        }).catch(e => {
          this.exportStarted = false
          EventBus.$emit('exportFinished')
          if (e.response.status === 400) {
            this.$notify.warning({
              title: 'Warning',
              message: 'No items were found for this category.',
              offset: 50
            })
          } else {
            this.$notify.error({
              title: 'Error',
              message: 'Failed to export items.',
              offset: 50
            })
          }
        })
      },
      fetchCategories () {
        this.categoriesLoading = true
        this.axios.get('admin/categories/parent').then(response => {
          const promises = response.data.map(async c => {
            var localSubcategories = await this.fetchSubcategories(c.id)
            localSubcategories = localSubcategories.map(sc => ({
              label: sc.name,
              value: sc.id
            }))
            if (localSubcategories.length) {
              return {
                label: c.name,
                value: c.id,
                children: localSubcategories
              }
            }
            return {
              label: c.name,
              value: c.id
            }
          })
          Promise.all(promises).then((result) => {
            this.options.push({
              label: 'Export all',
              value: -1
            })
            this.options = this.options.concat(result)
            this.categoriesLoading = false
          })
        }).catch(err => {
          console.log(err)
          this.$notify.error({
            title: 'Error',
            message: 'There was a problem while getting parent categories.',
          offset: 50
          })
          this.categoriesLoading = false
        })
      },
      async fetchSubcategories (parentCategoryId) {
        var response = await this.axios.get(`admin/categories/${parentCategoryId}`)
        return response.data
      },
      generateDownload (response) {
        window.open(this.axios.defaults.baseURL + response.urlToFile, '_self')
        this.$notify.info({
          title: 'Export successfully finished',
          message: 'Export file should start downloading in a moment.',
          offset: 50
        })
      },
      left () {
        this.noCategorySelected = false
      }
    },
    mounted () {
      this.fetchCategories()
    }
  }

</script>
<style lang="css">
  .export-container {
    display: flex;
    max-height: 40px;
    margin-left: 10px;
    margin-right: 5px;
  }

  .exel-img:hover {
    cursor: pointer;
  }

  .exel-img {
    height: 40px;
    margin-left: 5px;
  }

  .disabled {
    opacity: 0.5;
  }

  .disabled:hover {
    cursor: wait;
  }

  ul {
    list-style-type: none;
  }

  .gd-err-msg {
    color: red;
    font-size: 12px;
  }

</style>
