<template>
  <div class="export-container">
    <div>
      <el-cascader @blur="left" v-model="exportCategoryObj" placeholder="Select Category/Subcategory" class="select-class" v-loading="categoriesLoading"
        :options="options" change-on-select></el-cascader>
      </el-select>
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
          message: 'Once export file be ready, file download start automatically.'
        })
        this.axios.get('admin/items/exportAll', {
          responseType: 'blob'
        }).then((response) => {
          this.generateDownload(response.data)
          this.exportStarted = false
        }).catch(e => {
          console.log(e)
          this.exportStarted = false
          this.$notify.error({
            title: 'Error',
            message: 'Failed to export items.'
          })
        })
      },
      exportCategory (categoryId) {
        this.exportStarted = true
        this.$notify.info({
          title: 'Export started',
          message: 'Once export file be ready, file download start automatically.'
        })
        this.axios.get('admin/items/export/' + categoryId, {
          responseType: 'blob'
        }).then((response) => {
          this.generateDownload(response.data)
          this.exportStarted = false
        }).catch(e => {
          this.exportStarted = false
          if (e.response.status === 400) {
            this.$notify.warning({
              title: 'Warning',
              message: 'No files were found for this category.'
            })
          } else {
            this.$notify.error({
              title: 'Error',
              message: 'Failed to export items.'
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
        this.axios.get('admin/items/export/subcategory/' + subcategoryId, {
          responseType: 'blob'
        }).then((response) => {
          this.generateDownload(response.data)
          this.exportStarted = false
        }).catch(e => {
          this.exportStarted = false
          if (e.response.status === 400) {
            this.$notify.warning({
              title: 'Warning',
              message: 'No files were found for this category.'
            })
          } else {
            this.$notify.error({
              title: 'Error',
              message: 'Failed to export items.'
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
            this.options = result
            this.options.push({
              label: 'Export all',
              value: -1
            })
            this.categoriesLoading = false
          })
        }).catch(err => {
          console.log(err)
          this.$notify.error({
            title: 'Error',
            message: 'There was a problem while getting parent categories.'
          })
          this.categoriesLoading = false
        })
      },
      async fetchSubcategories (parentCategoryId) {
        var response = await this.axios.get(`admin/categories/${parentCategoryId}`)
        return response.data
      },
      generateDownload (file) {
        const url = window.URL.createObjectURL(new Blob([file]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', new Date().toLocaleString() + '_ItemsExport.xlsx')
        document.body.appendChild(link)
        link.click()
        this.$notify.info({
          title: 'Export successfully finished',
          message: 'Export file should start downloading in a moment.'
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

  .select-class {}

  ul {
    list-style-type: none;
  }

  .gd-err-msg {
    color: red;
    font-size: 12px;
  }

</style>
