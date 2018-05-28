<template>
  <el-container>
  <el-header>
    <h1>Import items</h1>
  </el-header>
  <el-main>
    <div v-if="importInProgress">
      <span>Import is in progress... Please wait</span>
    </div>
    <div v-else class="gd_container">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        :file-list="file"
        :auto-upload="false">
        <el-button size="medium">Select file</el-button>
        <el-button @click="importItems" size="medium"  type="primary">Import</el-button>
      </el-upload>

      <div v-if="importErrors && importErrors.length > 0" class="gd_left_text">
        <h2 class="gd_title">Errors</h2>
        <el-table
          :data="importErrors"
          :stripe="true"
          size="medium"
          :fit="true"
          class="gd_left_text">
          <el-table-column
            prop="row"
            label="Row"
            width="50px"
            >
          </el-table-column>
            <el-table-column
            prop="error"
            label="Error"
            >
            </el-table-column>
        </el-table>
      </div>
    </div>
  </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      importInProgress: false,
      importErrors: [],
      file: []
    }
  },
  mounted () {

  },
  methods: {
    importItems () {
      this.importInProgress = true
      this.axios.get('/admin/items/import')
        .then(Response => {
          console.log(Response.data)
          if (Response.data.errors && Response.data.errors.length > 0) {
            this.importErrors = Response.data.errors
            this.$notify({
              message: 'Import completed with errors',
              type: 'warning'
            })
          } else {
            this.$notify({
              message: 'Import completed successfully',
              type: 'suuccess'
            })
          }
          this.importInProgress = false
        })
        .catch(error => {
          this.$notify({
            message: 'Oops! :(',
            type: 'error'
          })
          console.log(error)
          this.importInProgress = false
        })
    }
  }
}
</script>

<style scoped>
  .el-table .warning-row {
    background: rgb(247, 156, 156);
  }
  .gd_left_text {
    text-align: left;
  }
</style>


