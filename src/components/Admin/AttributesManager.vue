<template>
  <el-card class="main-card" v-loading="loading">
    <h4 class="title-text">Attributes</h4>
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
          allow-create
          default-first-option
          placeholder="Enter key"
          v-loading="newAttribute.namesLoading"
          @change="loadAttributeValues"
          v-if="!reloadAttributeNamesBool">
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
          allow-create
          reserve-keyword
          default-first-option
          placeholder="Enter value"
          v-loading="newAttribute.valuesLoading"
          @change="buildAttribute">
          <el-option
            v-for="item in getAvailableValues()"
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
      reloadAttributeNamesBool: false,
      loading: false
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
    loadInitial (initialAttributes) {
      this.attributes = []

      if (!initialAttributes) {
        return
      }

      let promiseArray = []
      this.loading = true
      for (let attribute of initialAttributes) {
        let promise = this.axios.get(`admin/attributes/values?id=${attribute.attributeID}`)

        promiseArray.push(promise)

        promise
        .then(response => {
          this.attributes.push({
            key: attribute.name,
            value: attribute.value,
            id: attribute.attributeID,
            values: response.data
          })
        })
        .catch(err => {
          this.newAttribute.valuesLoading = false
          console.log(err)
          this.$notify.error({
            title: 'Error',
            message: 'There was a problem while getting attribute values'
          })
        })
      }

      Promise.all(promiseArray)
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
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

      if (!this.selectedAttribute || this.selectedAttribute.values) {
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
      if (!this.newAttribute.key || !this.newAttribute.value || /^\s+$/.test(this.newAttribute.key) || /^\s+$/.test(this.newAttribute.value)) {
        this.$notify.warning({
            title: 'Warning',
            message: 'Attribute key and value cannot be empty/whitespace only'
        })
        return
      }

      this.attributes.push({
        key: this.newAttribute.key,
        value: this.newAttribute.value,
        id: this.selectedAttribute ? this.selectedAttribute.id : -1,
        values: this.selectedAttribute ? this.selectedAttribute.values : [this.newAttribute.value]
      })

      if (this.selectedAttribute) {
        this.newAttributeNames.find(x => x.id === this.selectedAttribute.id).selected = true
      }

      this.selectedAttribute = {}
      this.newAttribute = {
        namesLoading: false,
        valuesLoading: false
      }

      this.reloadAttributeNames()
    },
    getAvailableAttributeNames () {
      return this.newAttributeNames.filter(x => !x.selected)
    },
    deleteAttribute (attribute) {
      this.$confirm(`Are you sure you want to delete this attribute?`,
      {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'Warning'
      }).then(() => {
        let index = this.attributes.indexOf(attribute)
        if (index >= 0) {
          this.attributes.splice(index, 1)
          this.reloadAttributeNames()
        }
      })
    },
    reloadAttributeNames () {
      this.reloadAttributeNamesBool = true
      this.$nextTick(() => {
        this.reloadAttributeNamesBool = false
      })
    },
    getAvailableValues () {
      if (!this.selectedAttribute) {
        return []
      }

      return this.selectedAttribute.values
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
