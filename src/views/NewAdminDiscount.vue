<template>
  <div class="main-div">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="2">
            <router-link :to="{name:'adminDiscount'}">
              <el-button><i class="el-icon-arrow-left"></i></el-button>
            </router-link>
          </el-col>
          <el-col :span="18"><h1>Add new discount</h1></el-col>
          <el-col :span="2">
            <el-button @click="resetForm('newDiscountForm')" round>Reset</el-button>
          </el-col>
          <el-col :span="2">
            <el-button @click="submitForm('newDiscountForm')" type="success" round>Save</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-form ref="newDiscountForm" :model="newDiscountForm" :rules="rules" label-position="right">
          <el-card>
              <el-row class="main-row">
                <el-col>
                  <el-form-item label="Discount description" prop="description">
                    <el-input placeholder="Description" v-model="newDiscountForm.description"></el-input>
                  </el-form-item>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <el-form-item label="Choose" prop="choose">
                        <el-select class="gd-width-190" v-model="newDiscountForm.choose" placeholder="Select">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Category" prop="category">
                        <el-select class="gd-width-220" v-model="newDiscountForm.categoryId" placeholder="Categories" @change="onCategoryChange">
                          <el-option
                            v-for="category in categories"
                            :key="category.id"
                            :label="category.name"
                            :value="category.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col v-if="newDiscountForm.choose == '2' || newDiscountForm.choose == '3'" :span="6">
                      <el-form-item label="Subcategory" prop="subCategory">
                        <el-select class="gd-width-220" v-model="newDiscountForm.subCategoryId" placeholder="Subcategories" @change="onSubCategoryChange">
                          <el-option
                            v-for="subCategory in subCategories"
                            :key="subCategory.id"
                            :label="subCategory.name"
                            :value="subCategory.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col v-if="newDiscountForm.choose == '3'" :span="6">
                      <el-form-item label="Item" prop="item">
                        <el-select class="gd-width-220" v-model="newDiscountForm.itemId" placeholder="Items" v-loading="itemsLoading">
                          <el-option
                            v-for="item in items"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="Discount" prop="discount">
                        <el-input-number :min="0" v-model="newDiscountForm.discount"></el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item>
                        <el-radio-group v-model="newDiscountForm.resource">
                          <el-radio label="Percentage"></el-radio>
                          <el-radio label="Euros"></el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="Valid until" prop="date">
                        <el-date-picker :picker-options="pickerOptions" v-model="newDiscountForm.date" type="date" placeholder="Pick a date"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
          </el-card>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>

export default {
  data () {
    return {
      categories: [],
      categoriesPromise: null,
      items: {},
      itemsLoading: false,
      subCategories: [],
      options: [{
          value: 1,
          label: 'Category'
        }, {
          value: 2,
          label: 'SubCategory'
        }, {
          value: 3,
          label: 'Item'
      }],
      newDiscountForm: {
        choose: 1,
        description: '',
        resource: 'Percentage',
        categoryId: null,
        subCategoryId: null,
        discount: 1,
        itemId: null,
        date: null
      },
      rules: {
        description: [{
            required: true,
            type: 'string',
            message: 'Please enter a discount description',
            trigger: 'blur'
        },
        {
          max: 150,
          trigger: 'blur',
          message: 'Sescription must be up to 150 characters in length'
        }],
        choose: [{
            required: true,
            type: 'number',
            message: 'Please choose the option',
            trigger: 'blur'
        }],
        categoryId: [{
            required: true,
            type: 'object',
            message: 'Please select a category',
            trigger: 'blur'
        }],
        discount: [{
            required: true,
            type: 'number',
            message: 'Please enter the discount value',
            trigger: 'blur'
        }]
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() <= Date.now()
        }
      }
    }
  },
  created () {
      this.fetchData()
  },
  methods: {
    fetchData () {
      this.loadCategory().catch(err => {
        console.log(err)
      })
    },
    loadCategory () {
        this.categoriesPromise = this.axios.get('Category').then(response => {
            this.categories = response.data
            this.categoriesPromise = null
          })
        return this.categoriesPromise
    },
    loadItems () {
      let filter = ''
      if (this.newDiscountForm.subCategoryId) {
        filter = `subCategory/id eq ${this.newDiscountForm.subCategoryId}`
      } else {
        filter = `category/id eq ${this.newDiscountForm.categoryId}`
      }
      this.itemsLoading = true
      this.axios.get(`odata/Items?$select=id,name&$filter=${filter}`).then(response => {
          this.items = response.data.value
          this.itemsLoading = false
        }).catch(err => {
          console.log(err)
          this.itemsLoading = false
        })
    },
    onCategoryChange () {
      this.newDiscountForm.subCategoryId = null
      this.categories
        .forEach((category, index) => {
          if (category.id === this.newDiscountForm.categoryId) {
            this.subCategories = category.subCategories
          }
        })
      this.loadItems()
    },
    onSubCategoryChange () {
      this.loadItems()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addDiscount()
          }
      })
    },
    addDiscount () {
      let isPercentages = false
      if (this.newDiscountForm.resource === 'Percentage') {
        isPercentages = true
      }

      let discount = {
        name: this.newDiscountForm.description,
        value: this.newDiscountForm.discount,
        to: this.newDiscountForm.date,
        isPercentages: isPercentages,
        itemID: null,
        categoryID: null,
        subCategoryID: null
      }

      if (this.newDiscountForm.choose === 3) {
        discount.itemID = this.newDiscountForm.itemId
      } else if (this.newDiscountForm.choose === 2) {
        discount.subCategoryID = this.newDiscountForm.subCategoryId
      } else {
        discount.categoryID = this.newDiscountForm.categoryId
      }
      this.axios.post('admin/discount', discount).then(response => {
        this.resetForm('newDiscountForm')
        this.$notify.success({
          title: 'Success',
          message: 'Succesfully added discount'
        })
      }).catch(err => {
        this.$notify.error({
          title: 'Error',
          message: 'There was a problem while adding discount: ' + err.response.data.message
        })
      })
    }
  }
}
</script>
<style scoped>
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
  .gd-width-220{
    width: 220px;
  }
  .gd-width-190{
    width: 190px;
  }
</style>

