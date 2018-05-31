<template>
  <el-container>
  <el-main>
    <div v-if="this.$store.getters.isImportInProgress">
      <span>Import is in progress... Please wait</span>
    </div>
    <div v-else class="gd_container gd_left_text">
      <h2>Select import file</h2>
      <el-row>
        <el-col :lg="2" :md="3" :sm="4">
        <el-button @click="importItems" size="medium"  type="primary" :disabled="file.length === 0">Import</el-button>
        </el-col>
        <el-col :lg="22" :md="21" :sm="20">
        <el-upload
          action=""
          :on-change="setFile"
          :auto-upload="false"
          :limit="1"
          accept=".xlsx">
          <el-button size="medium">Select file</el-button>
        </el-upload>
        </el-col>
      </el-row>
      <div
        v-if="this.$store.getters.importedItems && this.$store.getters.importedItems.length > 0"
        class="gd_left_text">
        <h2>Last import items</h2>
        <h4 class="gd_title">Successfully imported {{this.$store.getters.importedItems.length}} items</h4>
        <el-table
          :data="this.$store.getters.importedItems"
          :stripe="true"
          size="medium"
          :fit="true"
          class="gd_left_text"
          max-height="400">
          <el-table-column label="SKU" prop="sku" width="100px" />
          <el-table-column label="Name" prop="name" width="170px" />
          <el-table-column label="Description" prop="description">
            <template slot-scope="scope">
              <el-popover placement="top-start" title="Description" width="400" trigger="hover" :content="scope.row.description">
                <div slot="reference" class="description-cell">
                    <span v-if="scope.row.description.length>100">{{scope.row.description.substring(0, 100)}}...</span>
                    <span v-else>{{scope.row.description}}</span>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="Price" prop="price" width="100px">
            <template slot-scope="scope">
              {{scope.row.price}} €
            </template>
          </el-table-column>
          <el-table-column label="Category" prop="category" width="130px">
            <template slot-scope="scope">
              {{scope.row.category.name}}{{scope.row.subCategory ? ' / ' + scope.row.subCategory.name : ''}}
            </template>
          </el-table-column>
          <el-table-column label="Attributes" prop="attributes">
            <template slot-scope="scope">
              <el-popover placement="top-start" title="Attributes" width="400" trigger="hover" :content="concatinateAttributes(scope.row.attributes)">
                <div slot="reference" class="description-cell">
                  <span v-if="concatinateAttributes(scope.row.attributes).length > 100">{{concatinateAttributes(scope.row.attributes).substring(0, 100)}}...</span>
                  <span v-else>{{concatinateAttributes(scope.row.attributes)}}</span>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="Pictures" prop="pictures" width="130px">
            <template slot-scope="scope">
              <el-carousel height="150px" :autoplay="false" indicator-position="none" v-if="scope.row.pictures">
                <el-carousel-item v-for="picture in scope.row.pictures" :key="picture.id">
                  <img class="gd_picture" :src="picture.url">
                </el-carousel-item>
              </el-carousel>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="this.$store.getters.importErrors && this.$store.getters.importErrors.length > 0" class="gd_left_text">
        <h2>Last import errors</h2>
        <h4>Total number of errors ({{this.$store.getters.importErrors.length}})</h4>
        <el-table
          :data="this.$store.getters.importErrors"
          :stripe="true"
          size="medium"
          :fit="true"
          class="gd_left_text">
          <el-table-column prop="row" label="Row" width="50px"/>
          <el-table-column prop="error" label="Error"/>
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
  methods: {
    importItems () {
      EventBus.$emit('importStarted', this.file)
      this.file = []
    },
    concatinateAttributes (attributeList) {
      var attributes = ''
      if (attributeList) {
        for (var i = 0; i < attributeList.length; i++) {
          attributes = attributes + attributeList[i].name + ': ' + attributeList[i].value + '\r\n '
        }
        attributes = attributes.substring(0, attributes.length - 2)
      }
      return attributes
    },
    setFile (file) {
      this.file = file.raw
      return false
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
  .gd_picture {
    max-width: 130px;
  }
</style>


