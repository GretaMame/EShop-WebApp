<template>
  <el-container>
  <el-header>
    <h1>Import items</h1>
  </el-header>
  <el-main>
    <div v-if="this.$store.getters.isImportInProgress">
      <span>Import is in progress... Please wait</span>
    </div>
    <div v-else class="gd_container">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        :file-list="file"
        :auto-upload="false">
        <el-button size="medium">Select file</el-button>

      </el-upload>
      <el-button @click="importItems" size="medium"  type="primary">Import</el-button>
      <div v-if="this.$store.getters.importErrors && this.$store.getters.importErrors.length > 0" class="gd_left_text">
        <h2 class="gd_title">Last import errors</h2>
        <el-table
          :data="this.$store.getters.importErrors"
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
import EventBus from '@/eventBus/index.js'

export default {
  data () {
    return {
      importErrors: [],
      file: []
    }
  },
  mounted () {
    console.log(this.$store.getters.importErrors)
  },
  methods: {
    importItems () {
      EventBus.$emit('beginImport', this.file)
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


