<template>
  <el-container class="main-categories">
    <el-header>
      <h3>Categories</h3>
    </el-header>
    <el-main v-loading="loading">
      <el-tree v-if="reloadBool" :props="treeProps" :load="loadNodes" lazy>
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <div v-if="data.addNew">
            <el-input class="new-category-input" size="mini" placeholder="Add new" v-model="addNewName[`${node.parent.level > 0 ? node.parent.data.name : ''}${node.parent.level}`]"
            />
            <i class="el-icon-plus action-icon add-icon" @click="createCategory(node)" />
          </div>
          <span v-else>{{ node.label }}
            <i @click="editCategory(node)" class="el-icon-edit action-icon"></i>
            <i @click="deleteCategory(node)" v-if="!data.hasDescendants" class="el-icon-minus action-icon remove-icon"></i>
          </span>
        </span>
      </el-tree>
    </el-main>
  </el-container>
</template>

<script>
import EventBus from '@/eventBus/index.js'
  export default {
    data () {
      return {
        treeProps: {
          label: 'name',
          isLeaf: (data, node) => {
            return node.level === 2 || data.addNew
          },
          children: 'children'
        },
        loading: true,
        addNewName: {},
        reloadBool: true
      }
    },
    methods: {
      reloadTree () {
        this.reloadBool = false
        this.$nextTick(() => {
          this.reloadBool = true
        })
      },
      loadNodes (node, resolve) {
        if (node.level === 0) {
          this.loading = true
          this.axios.get('admin/categories/parent')
            .then(response => {
              this.loading = false
              response.data.push({
                'addNew': true,
                name: 'Add new'
              })
              resolve(response.data)
            })
            .catch(err => {
              this.loading = false
              if (err.cookieExpired) {
                EventBus.$emit('cookieExpired')
                return
              }
              this.$notify.error({
                title: 'Error',
                message: err.response.data.message,
                offset: 50
              })
            })
          return
        }

        this.axios.get(`admin/categories/${node.data.id}`)
          .then(response => {
            response.data.push({
              'addNew': true,
              name: 'Add new'
            })
            resolve(response.data)
          })
          .catch(err => {
            this.$notify.error({
              title: 'Error',
              message: err.response.data.message,
              offset: 50
            })
          })
      },
      createCategory (node) {
        let dictKey = `${node.parent.level > 0 ? node.parent.data.name : ''}${node.parent.level}`

        if (this.addNewName[dictKey] && (this.addNewName[dictKey].length < 10 || this.addNewName[dictKey].length > 50)) {
          this.$notify.error({
            title: 'Error',
            message: 'The category name should be between 10 and 50 characters',
            offset: 50
          })
          return
        }

        this.$confirm(`Are you sure you want to create this ${node.level === 2 ? 'sub' : ''}category?`, {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'Warning'
        }).then(() => {
          this.loading = true
          if (node.level === 1) {
            this.axios.post(`/admin/categories/parent`, {
                name: this.addNewName[dictKey]
              })
              .then(response => {
                this.reloadTree()
                this.$notify.success({
                  title: 'Success',
                  message: 'Succesfully created category',
          offset: 50
                })
              })
              .catch(err => {
                this.reloadTree()
                this.$notify.error({
                  title: 'Error',
                  message: err.response.data.message,
                  offset: 50
                })
              })
          } else {
            this.axios.post(`/admin/categories`, {
                name: this.addNewName[dictKey],
                parentID: node.parent.data.id
              })
              .then(response => {
                this.reloadTree()
                this.$notify.success({
                  title: 'Success',
                  message: 'Succesfully created subcategory',
          offset: 50
                })
              })
              .catch(err => {
                this.reloadTree()
                this.$notify.error({
                  title: 'Error',
                  message: err.response.data.message,
                  offset: 50
                })
              })
          }
        })
      },
      editCategory (node) {
        this.$prompt('Please enter new category name', 'Edit', {
          confirmButtonText: 'Edit',
          cancelButtonText: 'Cancel',
          inputPattern: /\w{10,50}/,
          inputErrorMessage: 'The category name should be between 10 and 50 characters'
        }).then(value => {
          this.loading = true
          if (node.level === 1) {
            this.axios.put(`/admin/categories/parent`, {
                id: node.data.id,
                name: value.value
              })
              .then(response => {
                this.reloadTree()
                this.$notify.success({
                  title: 'Success',
                  message: 'Succesfully edited category name',
          offset: 50
                })
              })
              .catch(err => {
                this.reloadTree()
                this.$notify.error({
                  title: 'Error',
                  message: err.response.data.message,
                  offset: 50
                })
              })
          } else {
            this.axios.put(`/admin/categories`, {
                id: node.data.id,
                name: value.value
              })
              .then(response => {
                this.reloadTree()
                this.$notify.success({
                  title: 'Success',
                  message: 'Succesfully edited subcategory name',
          offset: 50
                })
              })
              .catch(err => {
                this.reloadTree()
                this.$notify.error({
                  title: 'Error',
                  message: err.response.data.message,
                  offset: 50
                })
              })
          }
        })
      },
      deleteCategory (node) {
        this.$confirm(`Are you sure you want to delete this ${node.level === 2 ? 'sub' : ''}category?`, {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'Warning'
        }).then(() => {
          this.loading = true
          if (node.level === 1) {
            this.axios.delete(`/admin/categories/parent?id=${node.data.id}`)
              .then(response => {
                this.reloadTree()
                this.$notify.success({
                  title: 'Success',
                  message: 'Succesfully deleted category',
                  offset: 50
                })
              })
              .catch(err => {
                this.reloadTree()
                this.$notify.error({
                  title: 'Error',
                  message: err.response.data.message,
                  offset: 50
                })
              })
          } else {
            this.axios.delete(`/admin/categories?id=${node.data.id}`)
              .then(response => {
                this.reloadTree()
                this.$notify.success({
                  title: 'Success',
                  message: 'Succesfully deleted subcategory',
                  offset: 50
                })
              })
              .catch(err => {
                this.reloadTree()
                this.$notify.error({
                  title: 'Error',
                  message: err.response.data.message,
                  offset: 50
                })
              })
          }
        })
      }
    }
  }

</script>
<style>
  .action-icon {
    height: 28px;
    line-height: 28px;
    vertical-align: middle;
  }

  .add-icon {
    color: green;
  }

  .remove-icon {
    color: red;
  }

  .main-categories {
    min-height: 200px;
    font-size: 24px;
  }

  .new-category-input * {
    height: 22px !important;
    line-height: 22px !important;
  }

  .custom-tree-node {
    font-size: 20px;
  }

</style>
