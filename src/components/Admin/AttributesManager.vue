<template>
  <el-card class="main-card">
    <h4 class="title-text">Attributes selector</h4>
    <el-row v-for="attribute in attributes" :key="attribute.id">
      <el-col :span="10">{{ attribute.key }}</el-col>
      <el-col :span="2"><i class="el-icon-arrow-right"></i></el-col>
      <el-col :span="10">
        <el-select
          v-model="attribute.value"
          size="mini"
          filterable
          placeholder="Please enter a keyword"
          >
          <el-option
            v-for="item in attribute.values"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2"><div @click="deleteAttribute(attribute)"><i class="el-icon-delete hoverable-icon"></i></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-select
          v-model="newAttribute.key"
          size="mini"
          filterable
          placeholder="Please enter a keyword"
          v-loading="newAttribute.namesLoading"
          @change="loadAttributeValues"
          v-if="!reloadAttributeNames">
          <el-option
            v-for="item in getAvailableAttributeNames()"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2"><i class="el-icon-arrow-right"></i></el-col>
      <el-col :span="10">
        <el-select
          v-model="newAttribute.value"
          size="mini"
          filterable
          remote
          reserve-keyword
          placeholder="Please enter a keyword"
          v-loading="newAttribute.valuesLoading"
          @change="buildAttribute">
          <el-option
            v-for="item in selectedAttribute.values"
            :key="item.id"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  props: {
    itemId: {type: Number}
  },
  data () {
    return {
      attributes: [],
      newAttribute: {
        namesLoading: false,
        valuesLoading: false
      },
      selectedAttribute: {},
      newAttributeNames: [],
      reloadAttributeNames: false
    }
  },
  mounted () {
    this.newAttribute.namesLoading = true
    this.axios.get(`admin/attributes/names`)
      .then(result => {
        this.newAttributeNames = result.data
        this.newAttribute.namesLoading = false
      })
      .catch(err => {
        this.newAttribute.namesLoading = false
        console.log(err)
        this.$notify.error({
          title: 'Error',
          message: 'There was a problem while getting attribute names'
        })
      })

    if (this.itemId) {
      // implement load on item id
    }
  },
  watch: {
    attributes: {
      handler () {
        this.$emit('attributes-changed', this.attributes)
      },
      deep: true
    }
  },
  methods: {
    reset () {
      this.attributes = []
      this.newAttribute = {
        namesLoading: false,
        valuesLoading: false
      }
      this.selectedAttribute = {}
    },
    loadAttributeValues (attributeName) {
      this.selectedAttribute = this.newAttributeNames.find(x => x.name === attributeName)

      if (this.selectedAttribute.values) {
        return
      }

      this.newAttribute.valuesLoading = true
      this.axios.get(`admin/attributes/values?id=${this.selectedAttribute.id}`)
        .then(response => {
          this.newAttribute.valuesLoading = false
          this.selectedAttribute.values = response.data
        })
        .catch(err => {
          this.newAttribute.valuesLoading = false
          console.log(err)
          this.$notify.error({
            title: 'Error',
            message: 'There was a problem while getting attribute values'
          })
        })
    },
    buildAttribute () {
      this.attributes.push({
        key: this.newAttribute.key,
        value: this.newAttribute.value,
        id: this.selectedAttribute.id,
        values: this.selectedAttribute.values
      })

      this.newAttributeNames.find(x => x.id === this.selectedAttribute.id).selected = true

      this.selectedAttribute = {}
      this.newAttribute = {
        namesLoading: false,
        valuesLoading: false
      }

      this.reloadAttNames()
    },
    getAvailableAttributeNames () {
      return this.newAttributeNames.filter(x => !x.selected)
    },
    deleteAttribute (attribute) {
      this.$confirm(`Are you sure you want to create this attribute?`,
      {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'Warning'
      }).then(() => {
        let index = this.attributes.indexOf(attribute)
        if (index >= 0) {
          this.attributes.splice(index, 1)
          this.reloadAttNames()
        }
      })
    },
    reloadAttNames () {
      this.reloadAttributeNames = true
      this.$nextTick(() => {
        this.reloadAttributeNames = false
      })
    }
  }
}
</script>
<style scoped>
.main-card{
  overflow-y: auto;
  margin: 8px;
}
.title-text{
  margin: 0 0 8px 0;
}
.attribute-cell{
  align-self: center;
}
.hoverable-icon:hover{
  background-color: rgba(0,0,0,0.1);
}
</style>
