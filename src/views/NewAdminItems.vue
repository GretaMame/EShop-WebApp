<template>
  <div class="main-div">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="2">
            <router-link :to="{name:'adminItems'}">
              <el-button><i class="el-icon-arrow-left"></i></el-button>
            </router-link>
          </el-col>
          <el-col :span="18"><h1>Add new item</h1></el-col>
          <el-col :span="2">
            <el-button @click="resetForm('newItemForm')" round>Reset</el-button>
          </el-col>
          <el-col :span="2">
            <el-button @click="submitForm('newItemForm')" type="success" round>Save</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-form ref="newItemForm" :model="newItemForm" :rules="rules">
          <el-card>
              <el-row class="main-row">
                <el-col :span="11">
                  <el-form-item label="Name" prop="name">
                    <el-input placeholder="Name" v-model="newItemForm.name"></el-input>
                  </el-form-item>
                  <el-row>
                    <el-col :span="10">
                      <el-form-item label="Parent category" prop="parentCategory">
                        <el-select
                          class="small-input-fix"
                          v-loading="parentCategoriesLoading"
                          placeholder="Parent Category"
                          v-model="selectedParentId"
                          @change="fetchChildren">
                          <el-option
                            v-for="parentCategory in parentCategories"
                            :key="parentCategory.id"
                            :label="parentCategory.name"
                            :value="parentCategory.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="Child Category" prop="categoryid">
                        <el-select class="small-input-fix" v-loading="childrenCategoriesLoading" placeholder="Child Category" v-model="newItemForm.categoryid">
                          <el-option
                            v-for="childCategory in childCategories"
                            :key="childCategory.id"
                            :label="childCategory.name"
                            :value="childCategory.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="SKU" prop="sku">
                    <el-input placeholder="SKU" v-model="newItemForm.sku"></el-input>
                  </el-form-item>
                  <el-form-item label="Description" prop="description">
                    <el-input type="textarea" v-model="newItemForm.description"></el-input>
                  </el-form-item>
                  <el-form-item label="Price" prop="price">
                    <el-input class="small-input-fix" :controls="false" placeholder="Price" v-model.lazy="newItemForm.price" v-money="money"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="13">
                  PICTURES/ATTRIBUTES
                </el-col>
              </el-row>
          </el-card>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import {VMoney} from 'v-money'

export default {
  directives: {
    money: VMoney
  },
  data () {
    return {
      somePrice: 123.25,
      anotherPrice: 321.56,
      newItemForm: {
        name: '',
        sku: '',
        description: '',
        price: 0.01,
        categoryid: null
      },
      selectedParentId: null,
      parentCategories: [],
      childCategories: [],
      parentCategoriesLoading: true,
      childrenCategoriesLoading: false,
      rules: {
        name: [{
            required: true,
            type: 'string',
            message: 'Please enter a name',
            trigger: 'blur'
        }],
        sku: [{
            required: true,
            type: 'string',
            message: 'Please enter a SKU',
            trigger: 'blur'
        }],
        description: [{
            required: true,
            type: 'string',
            message: 'Please enter a description',
            trigger: 'blur'
        }],
        price: [{
            required: true,
            pattern: '^(?!€ (0.00))',
            message: 'Please enter a price larger than 0,00',
            trigger: 'blur'
        }],
        categoryid: [{
            required: true,
            type: 'number',
            message: 'Please select a child category',
            trigger: 'blur'
        }]
      },
      money: {
        decimal: '.',
        thousands: '',
        prefix: '€ ',
        suffix: '',
        precision: 2
      }
    }
  },
  created () {
    this.fetchCategories()
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addItem()
          }
      })
    },
    fetchCategories () {
      this.parentCategoriesLoading = true
      this.axios.get('admin/categories/parent').then(response => {
        this.parentCategories = response.data
        this.parentCategoriesLoading = false
      }).catch(err => {
        console.log(err)
        this.$notify.error({
                    title: 'Error',
                    message: 'There was a problem while getting parent categories.'
                  })
        this.parentCategoriesLoading = false
      })
    },
    fetchChildren (parentCategoryId) {
      this.newItemForm.categoryid = null
      this.parentCategorySelected = true
      this.childrenCategoriesLoading = true
      this.axios.get(`admin/categories/${parentCategoryId}`).then(response => {
        this.childCategories = response.data
        this.childrenCategoriesLoading = false
      }).catch(err => {
        console.log(err)
        this.$notify.error({
                    title: 'Error',
                    message: 'There was a problem while getting children categories.'
                  })
        this.childrenCategoriesLoading = false
      })
    },
    addItem () {
      this.posting = true
      let formCopy = JSON.parse(JSON.stringify(this.newItemForm))
      formCopy.price = parseFloat(formCopy.price.split(' ')[1])
      this.axios.post('admin/items/create', formCopy).then(response => {
        this.resetForm('newItemForm')
        this.$notify.success({
          title: 'Success',
          message: 'Succesfully added item'
        })
      }).catch(err => {
        this.$notify.error({
          title: 'Error',
          message: 'There was a problem while getting the category: ' + err
        })
      })
    }
  }
}
</script>
<style>
  .main-div{
    padding: 16px 8px 0 0
  }
  .main-row{
    height: 75vh
  }
  .small-input-fix{
    float: left;
    margin-left: 8px
  }
</style>

