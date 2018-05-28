<template>
  <el-container>
    <el-header>
       <status-bar v-if="this.$store.getters.isImportInProgress"></status-bar>
    </el-header>
    <el-main>
    <AdminNavigation></AdminNavigation>
    <router-view/>
    </el-main>
    <el-footer>

    </el-footer>
  </el-container>
</template>
<script>
import AdminNavigation from '@/components/Navigation/Admin'
import StatusBar from '@/components/Import/StatusBar'
import EventBus from '@/eventBus/index.js'

export default{
  components: {
    AdminNavigation,
    StatusBar
  },
  data () {
    return {
      importErrors: [],
      file: []
    }
  },
  mounted () {
    EventBus.$on('beginImport', file => {
      console.log()
      this.importItems(file)
    })
  },
  methods: {
    importItems (file) {
      this.$store.dispatch('startImport')
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
              type: 'success'
            })
          }
          this.$store.dispatch('endImport')
          this.$store.dispatch('setImportErrors', this.importErrors)
          // EventBus.$emit('importCompleted', this.importErrors)
        })
        .catch(error => {
          this.$notify({
            message: 'Oops! :(',
            type: 'error'
          })
          console.log(error)
          this.$store.dispatch('endImport', null)
        })
    }
  }
}
</script>

<style scoped>
  .el-header {
    padding: 0;
    width: 100%;
  }
  header {
    height: 26px !important;
  }
</style>

