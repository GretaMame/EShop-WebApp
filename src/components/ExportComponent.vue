<template>
  <div class="export-container">
    <el-button :disabled="exportStarted" @click="startExport">Export all</el-button>
    <el-button :disabled="exportStarted" @click="exportCategory('exportForm')">Export category</el-button>
    <el-form :disabled="exportStarted" :model="exportForm" :rules="rules" ref="exportForm">
      <el-form-item prop="categoryId">
        <el-select class="small-input-fix" v-loading="categoriesLoading" placeholder="Category" v-model="exportForm.categoryId">
          <el-option v-for="category in categories" :key="category.id" :label="category.name" :value="category.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        exportStarted: false,
        exportForm: {
          categoryId: null
        },
        categories: null,
        categoriesLoading: false,
        rules: {
          categoryId: [{
            required: true,
            type: 'number',
            message: 'Please select a category',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      startExport () {
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
      exportCategory (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.exportStarted = true
            this.$notify.info({
              title: 'Export started',
              message: 'Once export file be ready, file download start automatically.'
            })
            this.axios.get('admin/items/export/' + this.exportForm.categoryId, {
              responseType: 'blob'
            }).then((response) => {
              this.generateDownload(response.data)
              this.exportStarted = false
            }).catch(e => {
              this.exportStarted = false
              console.log(e)
              this.$notify.error({
                title: 'Error',
                message: 'Failed to export items.'
              })
            })
          }
        })
      },
      fetchCategories () {
        this.categoriesLoading = true
        this.axios.get('admin/categories/parent').then(response => {
          this.categories = response.data
          this.categoriesLoading = false
        }).catch(err => {
          console.log(err)
          this.$notify.error({
            title: 'Error',
            message: 'There was a problem while getting parent categories.'
          })
          this.categoriesLoading = false
        })
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
      }
    },
    mounted () {
      this.fetchCategories()
    }
  }

</script>
<style lang="css" scoped>
  .export-container {
    display: flex;
    max-height: 40px;
    margin-left: 10px;
    margin-right: 5px;
  }

</style>
